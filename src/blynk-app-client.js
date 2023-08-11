// Blynk app client
// The module offers a Node.js interface to the Blynk server app API on the SSL port
// It allows to execute the same commands as the the Blynk app 
// It works only on private servers (not with the Blynk cloud server because it requires
// an SSL client authentication).
// git+https://github.com/ilcato/blynk-app-client.git
//

'use strict';

const tls = require('tls');
const fs = require('fs');
const zlib = require('zlib');
const crypto = require('crypto');
const SEND_TIMEOUT = 10000;
const {
	MsgType,
	CommandMap,
} = require('./commands/MessageType');

const MsgStatus = {
  OK                    :  200,
  USER_NOT_REGISTERED	  :  3,
  ILLEGAL_COMMAND       :  2,
  NOT_ALLOWED			      :	 6,
  NO_ACTIVE_DASHBOARD   :  8,
  INVALID_TOKEN         :  9,
  ILLEGAL_COMMAND_BODY  :  11,
  DEVICE_WENT_OFFLINE   :  18
};

const getCommandByString = (cmdString) => {
  switch (cmdString) {
    case "ping" :
      return MsgType.PING;
    case "login" :
      return MsgType.LOGIN;
	  case "getToken" :
		  return MsgType.GET_TOKEN;
    case 'CreateProject':
			return MsgType.CREATE_DASH;
		case 'CreateDevice':
			return MsgType.CREATE_DEVICE;
    case "deleteDash":
    	return MsgType.DELETE_DASH;
    case "activate":
    	return MsgType.ACTIVATE_DASHBOARD;
    case "createWidget":
    	return MsgType.CREATE_WIDGET;
    case "hardware" :
      return MsgType.HARDWARE;
    case "loadprofilegzipped" :
			return MsgType.LOAD_PROFILE_GZIPPED;
		case "getServer" :
			return MsgType.GET_SERVER;
		case 'RefreshToken' :
			return MsgType.REFRESH_TOKEN;
  }
}

const getStringByCommandCode = (cmd) => {
  switch (cmd) {
    case 0 :
      return "RESPONSE";
    case 20 :
      return "HARDWARE";
  }
}

const getStatusByCode = (statusCode) => {
  switch (statusCode) {
    case 200 :
      return "OK";
    case 2 :
      return "ILLEGAL_COMMAND";
	  case 3 :
	  	return "USER_NOT_REGISTERED";
	  case 6 :
	  	return "NOT_ALLOWED";
    case 8 :
      return "NO_ACTIVE_DASHBOARD";
    case 9 :
      return "INVALID_TOKEN";
    case 11 :
      return "ILLEGAL_COMMAND_BODY";
    case 18 :
    	return "DEVICE_WENT_OFFLINE";
  }
}

function BlynkAppClient(host, port) {
	this.host = host;
	this.port = port;
	this.msgId = 1;
	this.respPromises = new Map();
}

BlynkAppClient.prototype.connect = function(username, password) {
	this.options = {
		// key: fs.readFileSync('privatekey.pem'),
		// cert: fs.readFileSync('sonospi-server.crt'),
  	rejectUnauthorized: false,
	};
	var p = new Promise(function(resolve, reject) {
		var msgId = this.msgId;
		this.respPromises.set(msgId, {
			"resolve": resolve,
			"reject": reject
		});
		this.socket = tls.connect(this.port, this.host, this.options, function () {
				this.send("login " + username + " " + password);
			}.bind(this)
		);
		this.respPromises.get(msgId).timeout = setTimeout(() => {
			reject("connect timeout");
		}, SEND_TIMEOUT);

		this.socket.on('data', function(data) {
			var msgId = data.readUInt16BE(1);
			var r =	this.respPromises.get(msgId);
			switch (data[0]) {
				case MsgType.RESPONSE:
					var responseCode = data.readUInt16BE(3);
					r.resolve(responseCode);
					clearTimeout(r.timeout);
					break;
				case MsgType.HARDWARE:
					if (r != undefined) {
						var resp = data.toString('utf8', 5);
						var fields = resp.split('\0');
						r.resolve(fields);
						clearTimeout(r.timeout);
						this.respPromises.delete(msgId);
					}
					break;
				case MsgType.GET_TOKEN:
					if (r != undefined) {
						var resp = data.toString('utf8', 5);
						r.resolve(resp);
						clearTimeout(r.timeout);
					}
					break;
				case MsgType.LOAD_PROFILE_GZIPPED:
					if (r != undefined) {
						var buf = new Buffer(data.length - 5);
						data.copy(buf, 0, 5);
						zlib.unzip(buf, (err, buffer) => {
								if (!err) {
								var resp = buffer.toString('utf8');
								r.resolve(resp);
								} else {
								r.reject(err);
								}
						});
						clearTimeout(r.timeout);
					}
					break;
				case MsgType.SYNC:
					break;
				default:
					console.log("Response raw data: " + data);
					break;
			}
		}.bind(this));

		this.socket.on('end', function() {
			;
		}.bind(this));
		
  }.bind(this));
	return p;
}
BlynkAppClient.prototype.deleteDashboard = function(dashboardId) {
	var command = "deleteDash " + dashboardId;
	var p = new Promise(function(resolve, reject) {
		var msgId = this.msgId;
		this.respPromises.set(msgId, {
			"resolve": resolve,
			"reject": reject
		});
		this.send(command);
		this.respPromises.get(msgId).timeout = setTimeout(() => {
			reject("deleteDashboard timeout");
		}, SEND_TIMEOUT);
	}.bind(this));
	return p;
}
BlynkAppClient.prototype.createProject = function(dashboardId, name, boardType) {
	const projectObj = {
		id: dashboardId,
		name,
		isShared: false,
		keepScreenOn: false,
		theme: "Blynk",
		isPreview: false,
		devices: [
			{
				productId: -1,
				id: 0,
				vendor: name,
				name,
				boardType,
				connectionType: 'WI_FI'
			}
		],
		isAppConnectedOn: false,
		parentId: '-1',
		tags: [],
		isActive: false,
		'widgetBackgroundOn': false,
		'widgets': [],
		createdAt: 1681478459346,
		isNotificationsOff: false
	}

	const command = `CreateProject ${JSON.stringify(projectObj)}`;
	var p = new Promise(function(resolve, reject) {
		var msgId = this.msgId;
		this.respPromises.set(msgId, {
			"resolve": resolve,
			"reject": reject
		});
		this.send(command);
		this.respPromises.get(msgId).timeout = setTimeout(() => {
			reject("createDashboard timeout");
		}, SEND_TIMEOUT);
	}.bind(this));
	return p;
}
BlynkAppClient.prototype.refreshToken = function(dashboardId) {
	var command = "RefreshToken " + dashboardId;
	var p = new Promise(function(resolve, reject) {
		var msgId = this.msgId;
		this.respPromises.set(msgId, {
			"resolve": resolve,
			"reject": reject
		});
		this.send(command);
		this.respPromises.get(msgId).timeout = setTimeout(() => {
			reject("RefreshToken timeout");
		}, SEND_TIMEOUT);
	}.bind(this));
	return p;
}
BlynkAppClient.prototype.activate = function(dashboardId) {
	var command = "activate " + dashboardId;
	var p = new Promise(function(resolve, reject) {
		var msgId = this.msgId;
		this.respPromises.set(msgId, {
			"resolve": resolve,
			"reject": reject
		});
		this.send(command);
		this.respPromises.get(msgId).timeout = setTimeout(() => {
			reject("activate timeout");
		}, SEND_TIMEOUT);
	}.bind(this));
	return p;
}
BlynkAppClient.prototype.hardware = function(dashboardId, pinType, pinCommand, pinId, pinValue) {
	var command = "hardware " + dashboardId + " " + pinType + pinCommand + " " + pinId;
	if (pinValue != undefined)
		command = command + " " + pinValue;
	var p = new Promise(function(resolve, reject) {
		var msgId = this.msgId;
		this.respPromises.set(msgId, {
			"resolve": resolve,
			"reject": reject,
			"command": command
		});
		this.send(command);
		if (pinCommand == "w")
			resolve("done");
		else {
			this.respPromises.get(msgId).timeout = setTimeout(() => {
				reject("Hardware timeout: " + pinType+pinCommand + pinId + (pinValue != undefined ? pinValue : ""));
			}, SEND_TIMEOUT);
		}
	}.bind(this));
	return p;
}
BlynkAppClient.prototype.loadProfileGzipped = function(dashboardId) {
	var command = "loadprofilegzipped";
	if (dashboardId != undefined)
		command = command + " " + dashboardId;
	var p = new Promise(function(resolve, reject) {
		var msgId = this.msgId;
		this.respPromises.set(msgId, {
			"resolve": resolve,
			"reject": reject
		});
		this.send(command);
		this.respPromises.get(msgId).timeout = setTimeout(() => {
			reject("loadProfileGzipped timeout");
		}, SEND_TIMEOUT);
	}.bind(this));
	return p;
}

BlynkAppClient.prototype.close = function() {
}

BlynkAppClient.prototype.send = function(data) {
	console.log('data:', data);
	if (!this.socket) {
		console.log('socket is null');
		return;
	}
	var commandAndBody = data.split(" ");
	var message = this.createMessage(commandAndBody);
	this.socket.write(message);
}

const buildBlynkMessage = (cmd, msgId, cmdBody, isAppCommand) => {
	const BLYNK_HEADER_SIZE = 7;
	const bodyLength = (cmdBody ? cmdBody.length : 0);
	console.log('body length: ', bodyLength);

	const bufArray = new ArrayBuffer(BLYNK_HEADER_SIZE + bodyLength);
	let offset;
	const dataview = new DataView(bufArray);
	dataview.setUint8(0, cmd);
	dataview.setUint16(1, msgId);
	if (isAppCommand) {
		dataview.setUint32(3, bodyLength);
		offset = 7;
	} else {
		dataview.setUint16(3, bodyLength);
		offset = 5;
	}

	if (bodyLength > 0) {
		//todo optimize. should be better way
		const buf = new ArrayBuffer(bodyLength); // 2 bytes for each char
		const bufView = new Uint8Array(buf);
		for (let i = 0; i < cmdBody.length; i++, offset += 1) {
			dataview.setInt8(offset, cmdBody.charCodeAt(i));
		}
	}
	return new Buffer(bufArray);
}

BlynkAppClient.prototype.createMessage = function(commandAndBody) {
	let cmdBody = null;
	const cmdString = commandAndBody[0];
	const cmd = getCommandByString(cmdString);
	if (cmd == MsgType.LOGIN) {
		const username = commandAndBody[1];
		const pwd = commandAndBody[2];
		const hUser = crypto.createHash('sha256');
		const hPwd = crypto.createHash('sha256');
		const salt = hUser.update(username.toLowerCase()).digest();
		hPwd.update(pwd, "utf8");
		hPwd.update(salt, "utf8");			
		const finalHash = hPwd.digest('base64');			
		cmdBody = username + "\0" + finalHash;
	} else if (cmd == MsgType.CREATE_DASH || cmd == MsgType.CREATE_WIDGET) {
		cmdBody = commandAndBody.length > 1 ? commandAndBody.slice(1).join(' ') : null;
	} else{       
		cmdBody = commandAndBody.length > 1 ? commandAndBody.slice(1).join('\0') : null;
	}

	let isAppCommand = false;
	if (cmd == MsgType.CREATE_DASH || cmd == MsgType.CREATE_WIDGET || cmd == MsgType.CREATE_DEVICE || cmd == MsgType.LOGIN) {
		isAppCommand = true;
	}
	return buildBlynkMessage(cmd, this.msgId++, cmdBody, isAppCommand);
}

BlynkAppClient.prototype.createButtonWidget = function(dashboardId, widgetId, x, y, label) {
	const widgetObj = {
		id: widgetId,
		pwmMode: false,
		label: label,
		onLabel: '',
		offLabel: '',
		x,
		y,
		isDefaultColor: true,
		width: 2,
		height: 2,
		deviceId: 0,
		tabId: 0,
		color: 600084223,
		type: 'BUTTON',
		rangeMappingOn: false,
		min: 0,
		max: 1,
		pinType: 'DIGITAL',
		pin: 5,
		pushMode: true,
	};

	const command = `createWidget ${dashboardId}\0${JSON.stringify(widgetObj)}`;

	var p = new Promise(function(resolve, reject) {
		var msgId = this.msgId;
		this.respPromises.set(msgId, {
			"resolve": resolve,
			"reject": reject
		});
		this.send(command);
		this.respPromises.get(msgId).timeout = setTimeout(() => {
			reject("createWidget timeout");
		}, SEND_TIMEOUT);
	}.bind(this));
	return p;
}
BlynkAppClient.prototype.createDevice = function(dashboardId) {
	const deviceObj = {
		productId: -1,
		id:15646,
		vendor: 't1',
		name: 't1',
		boardType: 'NodeMCU',
		connectionType: 'WI_FI'
	};
	const command = `CreateDevice ${dashboardId}\0${JSON.stringify(deviceObj)}`;
	var p = new Promise(function(resolve, reject) {
		var msgId = this.msgId;
		this.respPromises.set(msgId, {
			"resolve": resolve,
			"reject": reject
		});
		this.send(command);
		this.respPromises.get(msgId).timeout = setTimeout(() => {
			reject("createWidget timeout");
		}, SEND_TIMEOUT);
	}.bind(this));
	return p;
}

module.exports.createClient = function(host, port) {
	return new BlynkAppClient(host, port);
}