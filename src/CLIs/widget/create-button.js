const {
  WidgetType,
  PinType,
} = require('../../commands/widget');
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
  widgetType: {
    type: 'string',
    demandOption: true,
    choices: Lodash.values(WidgetType),
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

const exportFunctions = {
  basicCommandOptions,
  commandOptions,
};

module.exports = exportFunctions;