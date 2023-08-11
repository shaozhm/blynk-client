const {
  SEND_TIMEOUT,
} = require('./send');

const {
  sendLogin,
} = require('./connect');

const COMMAND_CODE = 1;
const COMMAND_NAME = 'Register';
const COMMAND_LABEL = 'REGISTER';
const IS_APP_COMMAND = true;

const commandOnly = (client, username, password, appName) => {
    sendLogin(client, `${COMMAND_NAME} ${username} ${password} ${appName}`, COMMAND_CODE);
}


const command = (client, username, password, appName) => {
	return new Promise(function(resolve, reject) {
		const{
      msgId,
    } = client;
		client.respPromises.set(msgId, {
			resolve,
			reject,
    });
    
    commandOnly(client, username, password, appName);
    
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
  commandOnly,
}

const exportFunctions = {
	commandObject,
};

module.exports = exportFunctions;