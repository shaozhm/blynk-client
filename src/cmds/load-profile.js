const {
  loadProfileGzipped,
} = require('../commands');

const {
  basic,
} = require('./basic');

const commandOptions = {
  dashId: {
    alias: 'p',
    describe: 'dashboard ID',
    type: 'int',
    demandOption: false,
  }
}

const callbackCommand = (blynk, options) => (status) => loadProfileGzipped.command(blynk, options);
const callbackThen = () => (data) => {
  console.log(JSON.stringify(JSON.parse(data), null, 2));
}
const command = basic(callbackCommand, callbackThen);

const exportFunctions = {
  commandOptions,
  command,
};

module.exports = exportFunctions;