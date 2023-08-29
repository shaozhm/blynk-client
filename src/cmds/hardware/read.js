const {
  connect,
  client,
} = require('../../commands');

const {
  commandObject: hardwareSync,
} = require('../../commands/hardware/HardwareSync');

const {
  builder: loginBuilder,
  handler: loginHandler,
} = require('./login');

const builder = {
  ...loginBuilder,
  type: {
    describe: 'pin type',
    choices: ['d', 'a', 'v'],
    type: 'string',
    demandOption: true,
  },
  pin: {
    alias: 'i',
    descrive: 'pin number',
    type: 'int',
    demandOption: true,
  }
};

const command = 'read';
const desc = 'hardware read';
const handler = (options) => {
  // console.debug(options);
  loginHandler(options, hardwareSync.command);
};

const exportFunctions = {
  command,
  desc,
  builder,
  handler,
};

module.exports = exportFunctions;