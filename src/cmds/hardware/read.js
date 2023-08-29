const {
  commandObject: hardwareSync,
} = require('../../commands/hardware/HardwareSync');

const {
  builder: loginBuilder,
  handler: loginHandler,
} = require('./login');

// const builder = {
//   ...loginBuilder,
//   type: {
//     alias: 'e',
//     describe: 'pin type',
//     choices: ['d', 'a', 'v'],
//     type: 'string',
//     demandOption: true,
//   },
//   pin: {
//     alias: 'i',
//     descrive: 'pin number',
//     type: 'int',
//     demandOption: true,
//   }
// };

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
  })
}

const command = 'read <token> <pinType> [pinNumber..]';
const desc = 'hardware read';
const handler = (options) => {
  // console.debug(options);
  loginHandler(options, hardwareSync.command);
};

const exportFunctions = {
  command,
  desc,
  // object declaring the options the command accepts, or a function accepting and returning a yargs instance
  builder,
  handler,
};

module.exports = exportFunctions;