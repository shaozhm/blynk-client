const {
  refreshToken,
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

const callbackCommand = (blynk, options) => (status) => refreshToken.command(blynk, options);
const callbackThen = () => (data) => console.log('Device Token: ', data);
const command = basic(callbackCommand, callbackThen);

const exportFunctions = {
  commandOptions,
  command,
};

module.exports = exportFunctions;