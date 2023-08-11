const {
  send,
  SEND_TIMEOUT,
} = require('../send');


const COMMAND_CODE = 33;
const COMMAND_NAME = 'CreateWidget';
const COMMAND_LABEL = 'CREATE_WIDGET';
const IS_APP_COMMAND = true;

const command = (client, dashboardId, deviceId, widgetId, widgetType, label, onLabel, offLabel, x, y, width, height, pwmMode, pushMode, pinType, pinNumber) => {
	const widgetObj = {
		deviceId: deviceId,
		id: widgetId,
		pwmMode,
		label,
		onLabel,
		offLabel,
		x,
		y,
		width,
		height,
		isDefaultColor: true,
		tabId: 0,
		color: 600084223,
		type: widgetType,
		rangeMappingOn: false,
		min: 0,
		max: 1,
		pinType,
		pin: pinNumber,
		pushMode,
	};

	const slider = {
		deviceId:0,
		id:"92131335",
		pwmMode: false,
		label:"",
		x:2,
		y:0,
		width:4,
		height:1,
		tabId:0,
		isDefaultColor:true,
		color:600084223,
		type:"SLIDER",
		rangeMappingOn:false,
		min:0,
		max:1,
		sendOnReleaseOn:true,
		pin:-1,
		maximumFractionDigits: 1,
		showValueOn: true,
	}

	const vertialSlider = {
		id:"1854285283",
		deviceId:1555,
		pwmMode:false,
		label:"",
		x:6,
		y:0,
		width:1,
		height:3,
		tabId:0,
		isDefaultColor:true,
		color:600084223,
		type: 'VERTICAL_SLIDER',
		rangeMappingOn:false,
		sendOnReleaseOn:true,
		min:0,
		max:1023,
		pin:5,
		pinType:'VIRTUAL',
		maximumFractionDigits:4,
		showValueOn:true,
	};

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