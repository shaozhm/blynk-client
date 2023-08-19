const {
  getDevice,
} = require('../../commands');

const {
  basic,
} = require('../basic');

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
}

const command = 'get',
      desc = 'get a device';
const callbackCommand = (blynk, options) => (status) => getDevice.command(blynk, options);
const callbackThen = () => (data) => {
  const device = JSON.parse(data);
  console.log('Get Device: ', device);
};
const handler = basic(callbackCommand, callbackThen);

const exportFunctions = {
  command,
  desc,
  builder,
  handler,
};

module.exports = exportFunctions;