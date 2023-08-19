const {
  getShareToken,
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
}

const command = 'get-token',
      desc = 'get a share token';
const callbackCommand = (blynk, options) => (status) => getShareToken.command(blynk, options);
const callbackThen = () => (token) => console.log('Get Share Token: ', token);
const handler = basic(callbackCommand, callbackThen);

const exportFunctions = {
  command,
  desc,
  builder,
  handler,
};

module.exports = exportFunctions;