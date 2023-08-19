const Lodash = require('lodash');
const {
  updateDevice,
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
    type: 'int',
    demandOption: true,
  },
  deviceId: {
    alias: 'd',
    describe: 'device ID',
    type: 'int',
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

const command = 'update',
      desc = 'update a device';
const callbackCommand = (blynk, options) => (status) => updateDevice.command(blynk, options);
const callbackThen = () => (status) =>console.log('Update Device: ', status);
const handler = basic(callbackCommand, callbackThen);

const exportFunctions = {
  command,
  desc,
  builder,
  handler,
};

module.exports = exportFunctions;