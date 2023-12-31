const {
  getProjectByToken,
} = require('../../commands');

const {
  basic,
} = require('../basic');

const builder = {
  token: {
    alias: 't',
    type: 'string',
    describe: 'the token of project',
    demandOption: true,
  },
}

const command = 'get-project';
const desc = 'get project by token';
const callbackCommand = (blynk, options) => (status) => getProjectByToken.command(blynk, options);
const callbackThen = () => (data) => console.log(data);
const handler = basic(callbackCommand, callbackThen);

const exportFunctions = {
  command,
  desc,
  builder,
  handler,
};

module.exports = exportFunctions;