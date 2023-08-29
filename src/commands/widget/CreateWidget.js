const Lodash = require('lodash');
const {
  send,
  SEND_TIMEOUT,
} = require('../send');

const COMMAND_CODE = 33;
const COMMAND_NAME = 'CreateWidget';
const COMMAND_LABEL = 'CREATE_WIDGET';
const IS_APP_COMMAND = true;

const command = (client, options, keys) => {
	const dashId = options.dashId;
	const widgetObj = Lodash.omit(Lodash.pick(options, keys), ['dashId']);

	const tab = {
		id:"1236963761",
		deviceId:0,
		label:"0",
		pwmMode:false,
		isDefaultColor:true,
		color:600084223,
		activeTxtColor:-1,
		textColor:-750560001,
		underlineColor:-750560001,
		tabId:-1,
		pin:-1,
		x:0,
		y:0,
		width:8,
		height:1,
		min:0,
		max:1,
		tabs:[
			{"label":"AA"},
			{"label":"BB"},
			{"label":"CC"}
		],
		type:"TABS",
		rangeMappingOn:false,
	};

	const command = `${COMMAND_NAME} ${dashId}\0${JSON.stringify(widgetObj)}`;

	return new Promise(function(resolve, reject) {
		const{
      msgId,
    } = client;
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