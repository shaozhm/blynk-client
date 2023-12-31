const tls = require('tls');
const net = require('net');
const zlib = require('zlib');
const crypto = require('crypto');

const {
	MsgType,
} = require('./MessageType');

const {
	commandObject: hardware,
} = require('./main/Hardware');

const {
	commandObject: getProjectByClonedToken,
} = require('./main/GetProjectByClonedToken');

const {
	commandObject: loadProfileGziped,
} = require('./main/LoadProfileGziped');

const {
	buildBlynkMessage,
  SEND_TIMEOUT,
} = require('./send');

const ResponseCode = {
  DEVICE_NOT_IN_NETWORK   : 7,
}



const client = (host, port) => ({
	host,
	port,
	msgId: 1,
	respPromises: new Map(),
})

const createLoginMessage = (commandAndBody, code, client, isAppCommand) => {
	let cmdBody = null;
	const username = commandAndBody[1];
	const pwd = commandAndBody[2];
	const hUser = crypto.createHash('sha256');
	const hPwd = crypto.createHash('sha256');
	const salt = hUser.update(username.toLowerCase()).digest();
	hPwd.update(pwd, "utf8");
	hPwd.update(salt, "utf8");			
	const finalHash = hPwd.digest('base64');			
	cmdBody = username + "\0" + finalHash;
	if (commandAndBody.length === 4) {
		cmdBody += "\0" + commandAndBody[3]
	}
 	return buildBlynkMessage(code, client.msgId++, cmdBody, isAppCommand);
}

const sendLogin = (client, data, code, isAppCommand) => {
	if (!client.socket) {
		return;
	}
	var commandAndBody = data.split(" ");
	var message = createLoginMessage(commandAndBody, code, client, isAppCommand);
	client.socket.write(message);
}

const connect = (client, callback, isTLS, ...authOptions) => {
	client.options = {
		// key: fs.readFileSync('privatekey.pem'),
		// cert: fs.readFileSync('sonospi-server.crt'),
  	rejectUnauthorized: false,
	};
	return new Promise((resolve, reject) => {
		const {
      msgId,
      port,
      host,
    } = client;

		client.respPromises.set(msgId, {
			resolve,
			reject,
    });
    
		let socket;
		if (typeof(isTLS) === 'boolean' && isTLS || typeof(isTLS) === 'string' && (isTLS === 'yes' || isTLS === 'true')) {
			socket = tls.connect(port, host, client.options, () => {
				callback(...authOptions);
    });
		} else {
			socket = net.connect({host: host, port: port,}, function() {
			callback(...authOptions);
		});
		}

		client.respPromises.get(msgId).timeout = setTimeout(() => {
			reject(`connect timeout`);
		}, SEND_TIMEOUT);

		socket.on('data', (data) => {
			console.log('Received Data: ', data);
			const msgId = data.readUInt16BE(1);
			console.log('Received Message ID: ', msgId);
			const r =	client.respPromises.get(msgId);
			console.log('Received Message Type: ', data[0]);
			switch (data[0]) {
				case MsgType.RESPONSE:
					const responseCode = data.readUInt16BE(3);
					console.log('Response Code: ', responseCode);
					if (ResponseCode.DEVICE_NOT_IN_NETWORK === responseCode) {
						r.resolve('Device no in network.');
					} else {
						r.resolve(responseCode);
					}
					clearTimeout(r.timeout);
					break;
				case hardware.code:
					if (r != undefined) {
						const resp = data.toString('utf8', 5);
						const fields = resp.split('\0');
						r.resolve(fields);
						clearTimeout(r.timeout);
						client.respPromises.delete(msgId);
					}
					break;
				case MsgType.GET_TOKEN:
					if (r != undefined) {
						const resp = data.toString('utf8', 5);
						r.resolve(resp);
						clearTimeout(r.timeout);
					}
					break;
				case loadProfileGziped.code:
				case getProjectByClonedToken.code:
					if (r != undefined) {
						const buf = new Buffer(data.length - 7);
						data.copy(buf, 0, 7);
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
				default:
					console.log('MsgType: ', data[0]);
					if (r != undefined) {
						const resp = data.toString('utf8', 7);
						r.resolve(resp);
						clearTimeout(r.timeout);
					}
					console.log("Response raw data: " + data);
					break;
			}
		});

		socket.on('end', () => {
			;
		});
    
    client.socket = socket;
  });
}

const exportFunctions = {
	client,
	sendLogin,
	connect,
};

module.exports = exportFunctions;