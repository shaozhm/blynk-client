const Lodash = require('lodash');
const {
  WidgetType,
  PinType,
} = require('../../commands/widget/WidgetType');
const {
  createWidget,
} = require('../../commands');

const {
  basic,
} = require('../basic');

const basicCommandOptions = {
  dashId: {
    type: 'int',
    demandOption: true,
  },
  deviceId: {
    type: 'int',
    demandOption: true,
  },
  widgetId: {
    type: 'string',
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
  width: {
    type: 'int',
    demandOption: true,
  },
  height: {
    type: 'int',
    demandOption: true,
  },
  pinNumber: {
    type: 'int',
    demandOption: false,
    default: -1,
  },
  pinType: {
    type: 'string',
    demandOption: true,
    choices: Lodash.values(PinType),
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
  tabId: {
    type: 'int',
    demandOption: false,
    default: 0,
  },
}
const commandOptions = {
  ...basicCommandOptions,
  widgetType: {
    type: 'string',
    demandOption: false,
    choices: Lodash.values(WidgetType),
    default: WidgetType.BUTTON,
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

const callbackCommand = (blynk, options) => (status) => createWidget.command(blynk, options);
const callbackThen = () => (status) => console.log(status);
const command = basic(callbackCommand, callbackThen);

const exportFunctions = {
  basicCommandOptions,
  commandOptions,
  command,
};
module.exports = exportFunctions;