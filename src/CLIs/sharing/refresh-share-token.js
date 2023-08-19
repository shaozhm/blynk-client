const {
  refreshShareToken,
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
}

const callbackCommand = (blynk, options) => (status) => refreshShareToken.command(blynk, options);
const callbackThen = () => (token) => console.log('Refresh Share Token: ', token);
const command = basic(callbackCommand, callbackThen);

const exportFunctions = {
  commandOptions,
  command,
};

module.exports = exportFunctions;