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

const basicCommandOptions = {
  dashId: {
    alias: 'p',
    type: 'int',
    describe: 'dashboard id',
    demandOption: true,
  },
  deviceId: {
    type: 'int',
    demandOption: true,
  },
  id: {
    type: 'int',
    demandOption: false,
  },
  pwmMode: {
    type: 'boolean',
    demandOption: false,
    default: false,
  },
  label: {
    type: 'string',
    demandOption: false,
    default: '',
  },
  x: {
    type: 'int',
    demandOption: true,
  },
  y: {
    type: 'int',
    demandOption: true,
  },
  isDefaultColor: {
    type: 'boolean',
    demandOption: false,
    default: true,
  },
  color: {
    type: 'int',
    demandOption: false,
    default: 600084223,
  },
  rangeMappingOn: {
    type: 'boolean',
    demandOption: false,
    default: false,
  },
  tabId: {
    type: 'int',
    demandOption: false,
    default: 0,
  },
}
const builder = {
  ...basicCommandOptions,
  type: {
    type: 'string',
    describe: 'widget type',
    demandOption: false,
    choices: Lodash.values(WidgetType),
    default: WidgetType.BUTTON,
  },
  width: {
    type: 'int',
    demandOption: false,
    default: 2,
  },
  height: {
    type: 'int',
    demandOption: false,
    default: 2,
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
    default: PinType.DIGITAL,
  },
  min: {
    type: 'int',
    demandOption: false,
    default: 0,
  },
  max: {
    type: 'int',
    demandOption: false,
    default: 1,
  },
  onLabel: {
    type: 'string',
    demandOpiton: false,
    default: 'ON',
  },
  offLabel: {
    type: 'string',
    demandOption: false,
    default: 'OFF',
  },
  pushMode: {
    type: 'boolean',
    demandOption: false,
    default: true,
  },
};

const command = 'create-button',
      desc = 'create a button widget';
const callbackCommand = (blynk, options) => (status) => createWidget.command(blynk, options, Lodash.keys(builder));
const callbackThen = () => (status) => console.log(status);
const handler = basic(callbackCommand, callbackThen);

const exportFunctions = {
  basicCommandOptions,
  command,
  desc,
  builder,
  handler,
};
module.exports = exportFunctions;