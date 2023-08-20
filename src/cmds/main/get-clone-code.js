const {
  getCloneCode,
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
}

const command = 'get-clone-code';
const desc = 'get clone code';
const callbackCommand = (blynk, options) => (status) => getCloneCode.command(blynk, options);
const callbackThen = () => (data) => console.log(data);
const handler = basic(callbackCommand, callbackThen);

const exportFunctions = {
  command,
  desc,
  builder,
  handler,
};

module.exports = exportFunctions;