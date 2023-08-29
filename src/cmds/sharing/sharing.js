const {
  sharing,
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
  isShared: {
    type: 'string',
    demandOption: true,
    choices: ['on', 'off'],
  }
}

const command = 'sharing',
      desc = 'share a dashboard';
const callbackCommand = (blynk, options) => (status) => sharing.command(blynk, options);
const callbackThen = () => (token) => console.log('Share Token: ', token);
const handler = basic(callbackCommand, callbackThen);

const exportFunctions = {
  command,
  desc,
  builder,
  handler,
};

module.exports = exportFunctions;