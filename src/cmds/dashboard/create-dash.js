const Lodash = require('lodash');
const {
  createProject,
} = require('../../commands');

const {
  basic,
} = require('../basic');

const {
  BoardType,
  ConnectionType,
} = require('../../commands/device');

const builder = {
  id: {
    type: 'int',
    demandOption: true,
  },
  projectName: {
    type: 'string',
    demandOption: true,
  },
  isShared: {
    type: 'boolean',
    demandOption: false,
    default: false,
  },
  keepScreenOn: {
    type: 'boolean',
    demandOption: false,
    default: false,
  },
  theme: {
    type: 'string',
    demandOption: false,
    default: 'Blynk',
  },
  isAppConnectedOn: {
    type: 'boolean',
    demandOption: false,
    default: false,
  },
  widgetBackgroundOn: {
    type: 'boolean',
    demandOption: false,
    default: false,
  },
  isNotificationsOff: {
    type: 'boolean',
    demandOption: false,
    default: false,
  },
	deviceId: {
    type: 'int',
    demandOption: false,
    default: 0,
  },
	deviceName: {
    type: 'string',
    demandOption: false,
    default: 'DefaultDevice',
  },
	boardType: {
    type: 'string',
    demandOption: false,
    choices: Lodash.values(BoardType),
    default: BoardType.ESP8266,
  },
	connectionType: {
    type: 'string',
    demandOption: false,
    choices: Lodash.values(ConnectionType),
    default: ConnectionType.WI_FI,
  },
}

const command = 'create';
const desc = 'create a new dashboard';

const callbackCommand = (blynk, options) => (status) => createProject.command(blynk, options);
const callbackThen = () => (status) => console.log(status);
const handler = basic(callbackCommand, callbackThen);

const exportFunctions = {
  command,
  desc,
  builder,
  handler,
};

module.exports = exportFunctions;