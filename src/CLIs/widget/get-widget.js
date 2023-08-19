const {
  getWidget,
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

const callbackCommand = (blynk, options) => (status) => getWidget.command(blynk, options);
const callbackThen = () => (data) => console.log(JSON.parse(data));
const command = basic(callbackCommand, callbackThen);

const exportFunctions = {
  commandOptions,
  command,
};

module.exports = exportFunctions;