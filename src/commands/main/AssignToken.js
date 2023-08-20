const {
  send,
  SEND_TIMEOUT,
} = require('../send');

const COMMAND_CODE = 39;
const COMMAND_NAME = 'AssignToken';
const COMMAND_LABEL = 'ASSIGN_TOKEN';
const IS_APP_COMMAND = true;

const command = (client, {
  dashId,
  token,
}) => {
	const command = `${COMMAND_NAME} ${dashId}\0${token}`;
	return new Promise((resolve, reject) => {
		var msgId = client.msgId;
		client.respPromises.set(msgId, {
			resolve,
			reject,
		});
		send(client, command, COMMAND_CODE, IS_APP_COMMAND, ' ');
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