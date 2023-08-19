const {
  refreshToken,
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

const command = 'refresh-token',
      desc = 'refresh the token of a device';
const callbackCommand = (blynk, options) => (status) => refreshToken.command(blynk, options);
const callbackThen = () => (data) => console.log('Device Token: ', data);
const handler = basic(callbackCommand, callbackThen);

const exportFunctions = {
  command,
  desc,
  builder,
  handler,
};

module.exports = exportFunctions;