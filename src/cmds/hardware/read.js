const {
  commandObject: bridgeInit,
} = require('../../commands/hardware/BridgeInit');

const {
  commandObject: bridgeCmd,
} = require('../../commands/hardware/BridgeCmd');
const {
  basic,
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

// const builder = (yargs) => {
//   yargs.positional('token', {
//     describe: 'device token',
//     type: 'string',
//   }).positional('pinType', {
//     describe: 'pin type',
//     choices: ['d', 'a', 'v'],
//     type: 'string',
//   }).positional('pinNumber', {
//     describe: 'pin number',
//     type: 'number',
//   })
// }

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
  }).positional('bridgePin', {
    describe: 'set a pin number for bridge',
    type: 'number',
    default: 64,
  }).positional('targetToken', {
    describe: 'device token - target device',
    type: 'string',
  })
}

const command = 'read <token> <pinType> [pinNumber..]';
const desc = 'hardware read';
// const callbackCommand = (blynk, options) => (status) => hardwareSync.command(blynk, options);
// const callbackThen = () => (data) => {
//   console.log(data);
// };
const callbackCommand_1 = (blynk, options) => (status) => bridgeInit.command(blynk, options)
const callbackCommand_2 = (blynk, options) => (status) => bridgeCmd.command(blynk, options)
const callbackCommand_3 = (blynk, options) => (status) => {
  console.log('Command 3: ',status);
};
const handler = basic(callbackCommand_1, callbackCommand_2, callbackCommand_3);

const exportFunctions = {
  command,
  desc,
  // object declaring the options the command accepts, or a function accepting and returning a yargs instance
  builder,
  handler,
};

module.exports = exportFunctions;