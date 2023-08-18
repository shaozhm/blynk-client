const {
  send,
  SEND_TIMEOUT,
} = require('../send');

const {
	BoardType,
} = require('./BoardType');

const {
	ConnectionType,
} = require('./ConnectionType');

const COMMAND_CODE = 42;
const COMMAND_NAME = 'CreateDevice';
const COMMAND_LABEL = 'CREATE_DEVICE';
const IS_APP_COMMAND = true;

const command = (client, {
	dashId,
	deviceId,
	deviceName,
	boardType,
	connectionType,
}) => {
	const deviceObj = {
		productId: -1,
		id: deviceId,
		vendor: deviceName,
		name: deviceName,
		boardType: boardType,
		connectionType: connectionType,
	};
	const command = `${COMMAND_NAME} ${dashId}\0${JSON.stringify(deviceObj)}`;
	return new Promise((resolve, reject) => {
		const {
      msgId,
    } = client;
		client.respPromises.set(msgId, {
			resolve,
			reject,
		});
		send(client, command, COMMAND_CODE, IS_APP_COMMAND);
		client.respPromises.get(msgId).timeout = setTimeout(() => {
			reject(`${COMMAND_NAME} timeout`);
		}, SEND_TIMEOUT);
	});
}

const commandObject = {
	name: COMMAND_NAME,
	label: COMMAND_LABEL,
	code: COMMAND_CODE,
	isAppCommand: IS_APP_COMMAND,
	command,
}

const exportFunctions = {
	BoardType,
	ConnectionType,
	commandObject,
};

module.exports = exportFunctions;