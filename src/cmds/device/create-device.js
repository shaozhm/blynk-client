const Lodash = require('lodash');
const {
  createDevice,
} = require('../../commands');

const {
  basic,
} = require('../basic');

const {
  BoardType,
  ConnectionType,
} = require('../../commands/device');

const builder = {
  dashId: {
    alias: 'p',
    describe: 'dashboard ID',
    type: 'number',
    demandOption: true,
  },
  deviceId: {
    alias: 'd',
    describe: 'device ID',
    type: 'number',
    demandOption: true,
  },
  deviceName: {
    alias: 'n',
    describe: 'device name',
    type: 'string',
    demandOption: true,
  },
  boardType: {
    alias: 'b',
    describe: 'board type',
    type: 'string',
    demandOption: false,
    choices: Lodash.values(BoardType),
    default: BoardType.ESP8266,
  },
  connectionType: {
    alias: 'c',
    type: 'string',
    demandOption: false,
    choices: Lodash.values(ConnectionType),
    default: ConnectionType.WI_FI,
  }
}

const command = 'create',
      desc ='create a new device';
const callbackCommand = (blynk, options) => (status) => createDevice.command(blynk, options);
const callbackThen = () => (status) => console.log('Create Device: ', status);
const handler = basic(callbackCommand, callbackThen);

const exportFunctions = {
  command,
  desc,
  builder,
  handler,
};

module.exports = exportFunctions;