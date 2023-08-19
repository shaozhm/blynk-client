const {
  getDevices,
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
  }
}

const command = 'list',
      desc = 'get all devices of a specific dashboard';
const callbackCommand = (blynk, options) => (status) => getDevices.command(blynk, options);
const callbackThen = () => (data) => {
  const devices = JSON.parse(data);
  console.log('Get Devices: ', devices);
};
const handler = basic(callbackCommand, callbackThen);

const exportFunctions = {
  command,
  desc,
  builder,
  handler,
};

module.exports = exportFunctions;