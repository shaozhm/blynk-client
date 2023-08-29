const {
  deleteDevice,
} = require('../../commands');

const {
  basic,
} = require('../basic');

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
}

const command = 'delete',
      desc = 'delete a device';
const callbackCommand = (blynk, options) => (status) => deleteDevice.command(blynk, options);
const callbackThen = () => (status) => console.log('Delete Device: ', status);
const handler = basic(callbackCommand, callbackThen);

const exportFunctions = {
  command,
  desc,
  builder,
  handler,
};

module.exports = exportFunctions;