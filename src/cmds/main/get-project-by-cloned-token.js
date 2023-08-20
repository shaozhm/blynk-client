const {
  getProjectByClonedToken,
} = require('../../commands');

const {
  basic,
} = require('../basic');

const builder = {
  token: {
    alias: 't',
    type: 'string',
    describe: 'token',
    demandOption: true,
  },
}

const command = 'get-project-by-cloned-token';
const desc = 'get project by cloned token';
const callbackCommand = (blynk, options) => (status) => getProjectByClonedToken.command(blynk, options);
const callbackThen = () => (data) => console.log(JSON.stringify(JSON.parse(data), null, 2));
const handler = basic(callbackCommand, callbackThen);

const exportFunctions = {
  command,
  desc,
  builder,
  handler,
};

module.exports = exportFunctions;