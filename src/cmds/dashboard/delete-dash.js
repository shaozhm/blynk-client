const {
  deleteProject,
} = require('../../commands');

const {
  basic,
} = require('../basic');

const builder = {
  id: {
    type: 'number',
    demandOption: true,
  },
}

const command = 'delete';
const desc = 'delete a dashboard';
const callbackCommand = (blynk, options) => (status) => deleteProject.command(blynk, options);
const callbackThen = () => (status) => console.log(status);
const handler = basic(callbackCommand, callbackThen);

const exportFunctions = {
  command,
  desc,
  builder,
  handler,
};

module.exports = exportFunctions;