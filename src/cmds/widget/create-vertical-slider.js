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
  widgetType: {
    type: 'string',
    demandOption: false,
    choices: Lodash.values(WidgetType),
    default: WidgetType.VERTICAL_SLIDER,
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