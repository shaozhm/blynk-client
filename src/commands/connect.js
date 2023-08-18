const tls = require('tls');
const zlib = require('zlib');
const crypto = require('crypto');

const {
	MsgType,
} = require('./MessageType');

const {
	buildBlynkMessage,
  SEND_TIMEOUT,
} = require('./send');



const client = (host, port) => ({
	host,
	port,
	msgId: 1,
	respPromises: new Map(),
})

const createLoginMessage = (commandAndBody, code, client) => {
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
 	return buildBlynkMessage(code, client.msgId++, cmdBody, true);
}

const sendLogin = (client, data, code) => {
	if (!client.socket) {
		return;
	}
	var commandAndBody = data.split(" ");
	var message = createLoginMessage(commandAndBody, code, client);
	client.socket.write(message);
}

const connect = (client, callback, username, password, appName) => {
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
    
		const socket = tls.connect(port, host, client.options, () => {
				callback(username, password, appName);
    });
    
		client.respPromises.get(msgId).timeout = setTimeout(() => {
			reject(`connect timeout`);
		}, SEND_TIMEOUT);

		socket.on('data', (data) => {
			const msgId = data.readUInt16BE(1);
			const r =	client.respPromises.get(msgId);
			switch (data[0]) {
				case MsgType.RESPONSE:
					const responseCode = data.readUInt16BE(3);
					r.resolve(responseCode);
					clearTimeout(r.timeout);
					break;
				case MsgType.HARDWARE:
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
				case MsgType.LOAD_PROFILE_GZIPPED:
					if (r != undefined) {
						const buf = new Buffer(data.length - 5);
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