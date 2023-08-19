const {
  deleteWidget,
} = require('../../commands');

const {
  basic,
} = require('../basic');

const builder = {
  dashId: {
    type: 'int',
    demandOption: true,
  },
  widgetId: {
    type: 'string',
    demandOption: true,
  }
}

const command = 'delete',
      desc = 'delete a widget';
const callbackCommand = (blynk, options) => (status) => deleteWidget.command(blynk, options);
const callbackThen = () => (status) => console.log(status);
const handler = basic(callbackCommand, callbackThen);

const exportFunctions = {
  command,
  desc,
  builder,
  handler,
};

module.exports = exportFunctions;