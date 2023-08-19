const {
  send,
  SEND_TIMEOUT,
} = require('../send');


const COMMAND_CODE = 70;
const COMMAND_NAME = 'GetWidget';
const COMMAND_LABEL = 'GET_WIDGET';
const IS_APP_COMMAND = true;

const command = (client, {
	dashId: dashboardId,
	widgetId: widgetId,
}) => {
	const command = `${COMMAND_NAME} ${dashboardId}\0${widgetId}`;

	return new Promise(function(resolve, reject) {
		const{
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