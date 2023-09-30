const {
  commandObject: bridgeInit,
} = require('../../commands/hardware/BridgeInit');

const {
  commandObject: bridgeCmd,
} = require('../../commands/hardware/BridgeCmd');

const {
  basic,
} = require('./login');

const builder = (yargs) => {
  yargs.positional('token', {
    describe: 'device token - controller device',
    type: 'string',
  }).positional('pinType', {
    describe: 'pin type',
    choices: ['d', 'a', 'v'],
    type: 'string',
  }).positional('pinNumber', {
    describe: 'pin number',
    type: 'number',
  }).positional('pinValue', {
    describe: 'pin value',
    type: 'number',
  }).positional('bridgePin', {
    describe: 'set a pin number for bridge',
    type: 'number',
    default: 63,
  }).positional('targetToken', {
    describe: 'device token - target device',
    type: 'string',
  })
}

const command = 'write <token> <pinType> <pinNumber> <pinValue> [bridgePin] [targetToken]';
const desc = 'hardware write';
const callbackCommand_1 = (blynk, options) => (status) => bridgeInit.command(blynk, options)
const callbackCommand_2 = (blynk, options) => (status) => bridgeCmd.command(blynk, options)
const callbackCommand_3 = (blynk, options) => (status) => {
  console.log('Command 3: ',status);
};
const handler = basic(callbackCommand_1, callbackCommand_2, callbackCommand_3);

const exportFunctions = {
  command,
  desc,
  builder,
  handler,
};

module.exports = exportFunctions;