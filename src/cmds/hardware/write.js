const {
  commandObject: bridge,
} = require('../../commands/hardware/Bridge');

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
const callbackCommand = (blynk, options) => (status) => {
  console.log(status);
  bridge.command(blynk, options);
};
const callbackThen = () => (data) => {};
const handler = basic(callbackCommand, callbackThen);

const exportFunctions = {
  command,
  desc,
  builder,
  handler,
};

module.exports = exportFunctions;