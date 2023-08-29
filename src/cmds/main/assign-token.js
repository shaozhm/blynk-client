const {
  assignToken,
} = require('../../commands');

const {
  basic,
} = require('../basic');

const builder = {
  dashId: {
    alias: 'p',
    type: 'number',
    describe: 'dashboard id',
    demandOption: true,
  },
  token: {
    alias: 't',
    type: 'string',
    describe: 'the token of project',
    demandOption: true,
  },
}

const command = 'assign-token';
const desc = 'assign a new token';
const callbackCommand = (blynk, options) => (status) => assignToken.command(blynk, options);
const callbackThen = () => (status) => console.log(status);
const handler = basic(callbackCommand, callbackThen);

const exportFunctions = {
  command,
  desc,
  builder,
  handler,
};

module.exports = exportFunctions;