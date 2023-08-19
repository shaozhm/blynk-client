const {
  getWidget,
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

const command = 'get',
      desc = 'get a widget';
const callbackCommand = (blynk, options) => (status) => getWidget.command(blynk, options);
const callbackThen = () => (data) => console.log(JSON.parse(data));
const handler = basic(callbackCommand, callbackThen);

const exportFunctions = {
  command,
  desc,
  builder,
  handler,
};

module.exports = exportFunctions;