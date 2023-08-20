const {
  hardware,
} = require('../../commands');

const {
  basic,
} = require('../basic');

const builder = {
  dashId: {
    alias: 'p',
    type: 'int',
    describe: 'dashboard id',
    demandOption: true,
  },
  targetId: {
    alias: 't',
    type: 'string',
    describe: 'device id or tag id or widget id',
    demandOption: true,
  },
  pinType: {
    type: 'string',
    demandOption: true,
    choices: ['d', 'a', 'v'],
  },
  operation: {
    type: 'string',
    demandOption: true,
    choices: ['u', 'w'],
  },
  pin: {
    type: 'int',
    demandOption: true,
  },
  value: {
    type: 'string',
    demandOption: true,
  },
}

const command = 'hardware';
const desc = 'hardware';
const callbackCommand = (blynk, options) => (status) => getEnergy.command(blynk, options);
const callbackThen = () => (status) => console.log(status);
const handler = basic(callbackCommand, callbackThen);

const exportFunctions = {
  command,
  desc,
  builder,
  handler,
};

module.exports = exportFunctions;