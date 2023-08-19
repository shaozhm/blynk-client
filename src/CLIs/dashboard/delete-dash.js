const Lodash = require('lodash');
const {
  deleteProject,
} = require('../../commands');

const {
  basic,
} = require('../basic');

const commandOptions = {
  id: {
    type: 'int',
    demandOption: true,
  },
}

const callbackCommand = (blynk, options) => (status) => deleteProject.command(blynk, options);
const callbackThen = () => (status) => console.log(status);
const command = basic(callbackCommand, callbackThen);

const exportFunctions = {
  commandOptions,
  command,
};

module.exports = exportFunctions;