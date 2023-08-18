const {
  send,
  SEND_TIMEOUT,
} = require('../send');

const COMMAND_CODE = 21;
const COMMAND_NAME = 'CreateProject';
const COMMAND_LABEL = 'CREATE_DASH';
const IS_APP_COMMAND = true;

const command = (client, {
	id: dashboardId,
	projectName,
	isShared,
	keepScreenOn,
	theme,
	isAppConnectedOn,
	isNotificationsOff,
	widgetBackgroundOn,
	deviceId,
	deviceName,
	boardType,
	connectionType,
}) => {
	const projectObj = {
		id: dashboardId,
		name: projectName,
		isShared,
		keepScreenOn,
		theme,
		isPreview: false,
		devices: [
			{
				productId: -1,
				id: deviceId,
				vendor: deviceName,
				name: deviceName,
				boardType,
				connectionType,
			}
		],
		isAppConnectedOn,
		parentId: '-1',
		tags: [],
		isActive: false,
		widgetBackgroundOn,
		widgets: [],
		isNotificationsOff,
	}

	console.debug(projectObj);
	const command = `${COMMAND_NAME} ${JSON.stringify(projectObj)}`;
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