const {
  loadProfileGzipped,
} = require('../../commands');

const {
  basic,
} = require('../basic');

const builder = {
  dashId: {
    alias: 'p',
    describe: 'dashboard ID',
    type: 'int',
    demandOption: false,
  }
}

const command = 'load-profile',
      desc = 'load profile';
const callbackCommand = (blynk, options) => (status) => loadProfileGzipped.command(blynk, options);
const callbackThen = () => (data) => {
  console.log(JSON.stringify(JSON.parse(data), null, 2));
}
const handler = basic(callbackCommand, callbackThen);

const exportFunctions = {
  command,
  desc,
  builder,
  handler,
};

module.exports = exportFunctions;