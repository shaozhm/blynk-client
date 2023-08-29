const {
  commandObject: bridge,
} = require('../../commands/hardware/Bridge');

const {
  handler: loginHandler,
} = require('./login');

const builder = (yargs) => {
  yargs.positional('token', {
    describe: 'device token',
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
  })
}

const command = 'write <token> <pinType> <pinNumber> <pinValue>';
const desc = 'hardware write';
const handler = (options) => {
  loginHandler(options, bridge.command);
};

const exportFunctions = {
  command,
  desc,
  builder,
  handler,
};

module.exports = exportFunctions;