const {
  updateProjectSettings,
} = require('../../commands');

const {
  basic,
} = require('../basic');

const builder = {
  id: {
    type: 'int',
    demandOption: true,
  },
  projectName: {
    type: 'string',
    demandOption: true,
  },
  isShared: {
    type: 'boolean',
    demandOption: false,
    default: false,
  },
  keepScreenOn: {
    type: 'boolean',
    demandOption: false,
    default: false,
  },
  theme: {
    type: 'string',
    demandOption: false,
    default: 'Blynk',
  },
  isAppConnectedOn: {
    type: 'boolean',
    demandOption: false,
    default: false,
  },
  widgetBackgroundOn: {
    type: 'boolean',
    demandOption: false,
    default: false,
  },
  isNotificationsOff: {
    type: 'boolean',
    demandOption: false,
    default: false,
  },
}

const command = 'update-settings';
const desc = 'update the settings of a specific dashboard';
const callbackCommand = (blynk, options) => (status) => updateProjectSettings.command(blynk, options);
const callbackThen = () => (status) => console.log(status);
const handler = basic(callbackCommand, callbackThen);

const exportFunctions = {
  command,
  desc,
  builder,
  handler,
};

module.exports = exportFunctions;