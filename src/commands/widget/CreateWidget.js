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
	const widgetObj = Lodash.pick(options, keys);

	const digitDisplay = {
		id:"290273867",
		deviceId:1562,
		pwmMode:false,
		label:"",
		x:2,
		y:1,
		width:2,
		height:1,
		tabId:0,
		isDefaultColor:false,
		color:79755519,
		type:"DIGIT4_DISPLAY",
		rangeMappingOn:false,
		min:0,
		max:1023,
		pin:2,
		pinType:"ANALOG",
		fontSize:"SMALL",
		frequency:1000,
	};

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

	const command = `${COMMAND_NAME} ${dashboardId}\0${JSON.stringify(widgetObj)}`;

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

const createButtonCommandObject = {
	name: COMMAND_NAME,
	label: COMMAND_LABEL,
	code: COMMAND_CODE,
	isAppCommand: IS_APP_COMMAND,
	command,
}

const exportFunctions = {
	createButtonCommandObject,
};

module.exports = exportFunctions;