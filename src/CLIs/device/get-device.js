const {
  getDevice,
} = require('../../commands');

const {
  basic,
} = require('../basic');

const commandOptions = {
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

const callbackCommand = (blynk, options) => (status) => getDevice.command(blynk, options);
const callbackThen = () => (data) => {
  const device = JSON.parse(data);
  console.log('Get Device: ', device);
};
const command = basic(callbackCommand, callbackThen);

const exportFunctions = {
  commandOptions,
  command,
};

module.exports = exportFunctions;