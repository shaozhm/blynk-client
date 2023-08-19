const Lodash = require('lodash');
const {
  WidgetType,
} = require('../../commands/widget/WidgetType');

const {
  PinType,
} = require('../../commands/widget/PinType');

const {
  basic,
} = require('../basic');

const {
  createWidget,
} = require('../../commands');

const {
  basicCommandOptions,
} = require('./create-button');

const commandOptions = {
  ...basicCommandOptions,
  widgetType: {
    type: 'string',
    demandOption: false,
    choices: Lodash.values(WidgetType),
    default: WidgetType.SLIDER,
  },
  sendOnReleaseOn: {
    type: 'boolean',
    demandOpiton: false,
    default: true,
  },
  maximumFractionDigits: {
    type: 'int',
    demandOption: false,
    default: 1,
  },
  showValueOn: {
    type: 'boolean',
    demandOption: false,
    default: true,
  },
};

const callbackCommand = (blynk, options) => (status) => createWidget.command(blynk, options);
const callbackThen = () => (status) => console.log(status);
const command = basic(callbackCommand, callbackThen);

const exportFunctions = {
  commandOptions,
  command,
};

module.exports = exportFunctions;