const {
  send,
  SEND_TIMEOUT,
} = require('../send');

const COMMAND_CODE = 50;
const COMMAND_NAME = 'GetDevice';
const COMMAND_LABEL = 'MOBILE_GET_DEVICE';
const IS_APP_COMMAND = true;

const command = (client, {
	dashId, 
	deviceId,
}) => {
	const command = `${COMMAND_NAME} ${dashId}\0${deviceId}`;
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
	commandObject,
};

module.exports = exportFunctions;