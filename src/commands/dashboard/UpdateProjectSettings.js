const {
  send,
  SEND_TIMEOUT,
} = require('../send');

const COMMAND_CODE = 38;
const COMMAND_NAME = 'UpdateProjectSettings';
const COMMAND_LABEL = 'UPDATE_PROJECT_SETTINGS';
const IS_APP_COMMAND = true;

const command = (client, dashboardId, projectName, isShared, keepScreenOn, theme, isAppConnectedOn, isNotificationsOff, widgetBackgroundOn) => {
	const projectObj = {
		name: projectName,
		isShared,
		keepScreenOn,
		theme,
		isAppConnectedOn,
		widgetBackgroundOn,
		isNotificationsOff,
	}

	const command = `${COMMAND_NAME} ${dashboardId}\0${JSON.stringify(projectObj)}`;
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