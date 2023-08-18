const {
  send,
  SEND_TIMEOUT,
} = require('../send');
const zlib = require('zlib');

const COMMAND_CODE = 24;
const COMMAND_LABEL = 'LOAD_PROFILE_GZIPPED';
const COMMAND_NAME = 'LoadProfile';
const IS_APP_COMMAND = true;

const command = (client) => {
	const command = `${COMMAND_NAME} `;
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