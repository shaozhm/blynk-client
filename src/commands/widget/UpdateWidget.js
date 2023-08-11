const {
  send,
  SEND_TIMEOUT,
} = require('../send');

const COMMAND_CODE = 34;
const COMMAND_NAME = 'UpdateWidget';
const COMMAND_LABEL = 'UPDATE_WIDGET';
const IS_APP_COMMAND = true;

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