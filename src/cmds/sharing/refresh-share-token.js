const {
  refreshShareToken,
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
}

const command = 'refresh-token',
      desc = 'refresh a share token';
const callbackCommand = (blynk, options) => (status) => refreshShareToken.command(blynk, options);
const callbackThen = () => (token) => console.log('Refresh Share Token: ', token);
const handler = basic(callbackCommand, callbackThen);

const exportFunctions = {
  command,
  desc,
  builder,
  handler,
};

module.exports = exportFunctions;