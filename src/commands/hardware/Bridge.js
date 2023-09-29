const {
  send,
  SEND_TIMEOUT,
} = require('../send');

const COMMAND_CODE = 15;
const COMMAND_NAME = 'Bridge';
const COMMAND_LABEL = 'BRIDGE';
const IS_APP_COMMAND = false;

const command = (client, options) => {
	const {
		pinType,
		pinNumber,
    pinValue,
    token,
    bridgePin,
    targetToken,
	} = options;
	const operation = 'i';
  const target = targetToken ? targetToken : token
	const messageBody = `${bridgePin}\0${operation}\0${target}`
  const command = `${COMMAND_NAME} ${messageBody}`;
	
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