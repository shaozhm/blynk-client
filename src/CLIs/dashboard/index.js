const {
  commandOptions: createDashOptions,
  command: createDashCommand,
} = require('./create-dash');

const {
  commandOptions: deleteDashOptions,
  command: deleteDashCommand,
} = require('./delete-dash');

const {
  commandOptions: activateDashOptions,
  command: activateDashCommand,
} = require('./activate-dash');

const {
  commandOptions: deactivateDashOptions,
  command: deactivateDashCommand,
} = require('./deactivate-dash');

const {
  commandOptions: updateSettingsOptions,
  command: updateSettingsCommand,
} = require('./update-settings');

const exportFunctions = {
  createDashOptions,
  createDashCommand,
  deleteDashOptions,
  deleteDashCommand,
  activateDashOptions,
  activateDashCommand,
  deactivateDashOptions,
  deactivateDashCommand,
  updateSettingsOptions,
  updateSettingsCommand,
};

module.exports = exportFunctions;