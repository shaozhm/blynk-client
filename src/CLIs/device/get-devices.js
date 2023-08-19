const {
  getDevices,
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
  }
}

const callbackCommand = (blynk, options) => (status) => getDevices.command(blynk, options);
const callbackThen = () => (data) => {
  const devices = JSON.parse(data);
  console.log('Get Devices: ', devices);
};
const command = basic(callbackCommand, callbackThen);

const exportFunctions = {
  commandOptions,
  command,
};

module.exports = exportFunctions;