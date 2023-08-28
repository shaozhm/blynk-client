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
    default: WidgetType.DIGIT4_DISPLAY,
  },
  width: {
    type: 'int',
    demandOption: false,
    default: 2,
  },
  height: {
    type: 'int',
    demandOption: false,
    default: 1,
  },
  pin: {
    type: 'int',
    demandOption: false,
    default: -1,
  },
  pinType: {
    type: 'string',
    demandOption: false,
    choices: Lodash.values(PinType),
    default: PinType.ANALOG,
  },
  min: {
    type: 'int',
    demandOption: false,
    default: 0,
  },
  max: {
    type: 'int',
    demandOption: false,
    default: 1023,
  },
  fontSize: {
    type: 'string',
    demandOption: false,
    default: 'SMALL',
  },
  frequency: {
    type: 'int',
    demandOption: false,
    default: 1000,
  },
};

const command = 'create-digital-display',
      desc = 'create a digital display widget';
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