const {
  deleteWidget,
} = require('../../commands');

const {
  basic,
} = require('../basic');

const commandOptions = {
  dashId: {
    type: 'int',
    demandOption: true,
  },
  widgetId: {
    type: 'string',
    demandOption: true,
  }
}

const callbackCommand = (blynk, options) => (status) => deleteWidget.command(blynk, options);
const callbackThen = () => (status) => console.log(status);
const command = basic(callbackCommand, callbackThen);

const exportFunctions = {
  commandOptions,
  command,
};

module.exports = exportFunctions;