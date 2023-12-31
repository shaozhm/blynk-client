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

const builder = {
  ...basicCommandOptions,
  type: {
    type: 'string',
    demandOption: false,
    choices: Lodash.values(WidgetType),
    default: WidgetType.VERTICAL_SLIDER,
  },
  width: {
    type: 'number',
    demandOption: false,
    default: 1,
  },
  height: {
    type: 'number',
    demandOption: false,
    default: 3,
  },
  pin: {
    type: 'number',
    demandOption: false,
    default: -1,
  },
  pinType: {
    type: 'string',
    demandOption: false,
    choices: Lodash.values(PinType),
    default: PinType.VIRTUAL,
  },
  min: {
    type: 'number',
    demandOption: false,
    default: 0,
  },
  max: {
    type: 'number',
    demandOption: false,
    default: 1023,
  },
  sendOnReleaseOn: {
    type: 'boolean',
    demandOpiton: false,
    default: true,
  },
  maximumFractionDigits: {
    type: 'number',
    demandOption: false,
    default: 1,
  },
  showValueOn: {
    type: 'boolean',
    demandOption: false,
    default: true,
  },
};

const command = 'create-vertical-slider',
      desc = 'create a vertical slider widget';
const callbackCommand = (blynk, options) => (status) => createWidget.command(blynk, options, Lodash.keys(builder));
const callbackThen = () => (status) => console.log(status);
const handler = basic(callbackCommand, callbackThen);

const exportFunctions = {
  command,
  desc,
  builder,
  handler,
};

module.exports = exportFunctions;