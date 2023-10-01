const SEND_TIMEOUT = 10000;

// const buildBlynkMessage = (cmd, msgId, cmdBody, isAppCommand) => {
// 	const BLYNK_HEADER_SIZE = 7;
// 	const bodyLength = (cmdBody ? cmdBody.length : 0);
// 	console.log('body length: ', bodyLength);

// 	const bufArray = new ArrayBuffer(BLYNK_HEADER_SIZE + bodyLength);
// 	const dataview = new DataView(bufArray);
// 	dataview.setUint8(0, cmd);
// 	dataview.setUint16(1, msgId);
// 	dataview.setUint32(3, bodyLength);

// 	if (bodyLength > 0) {
// 		//todo optimize. should be better way
// 		const buf = new ArrayBuffer(bodyLength); // 2 bytes for each char
// 		const bufView = new Uint8Array(buf);
// 		for (let i = 0, offset =  7; i < cmdBody.length; i++, offset += 1) {
// 			dataview.setInt8(offset, cmdBody.charCodeAt(i));
// 		}
// 	}
// 	return new Buffer(bufArray);
// }

const buildBlynkMessage = (cmd, msgId, cmdBody, isAppCommand) => {
	const BLYNK_HEADER_SIZE = isAppCommand ? 7 : 5;
	const bodyLength = (cmdBody ? cmdBody.length : 0);
	console.log('body length[', bodyLength, '], message: ', cmdBody);

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


const createMessage = (commandAndBody, code, client, isAppCommand, joinToken) => {
	let cmdBody = null;
	// const cmdString = commandAndBody[0];
  // const cmd = code;
  if (!joinToken) {
    cmdBody = commandAndBody.length > 1 ? commandAndBody.slice(1).join('\0') : null;
  } else {
    cmdBody = commandAndBody.length > 1 ? commandAndBody.slice(1).join(joinToken) : null;
  }
	return buildBlynkMessage(code, client.msgId++, cmdBody, isAppCommand);
}

const send = (client, data, code, isAppCommand, joinToken) => {
	console.log('send:', data);
	if (!client.socket) {
		console.log('socket is null');
		return;
	}
	var commandAndBody = data.split(' ');
	var message = createMessage(commandAndBody, code, client, isAppCommand, joinToken);
	client.socket.write(message);
}

const exportFunctions = {
	send,
	buildBlynkMessage,
  SEND_TIMEOUT,
};

module.exports = exportFunctions;