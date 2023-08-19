const {
  commandOptions: createDashOptions,
  command: createDashCommand,
} = require('./create-dash');

const {
  commandOptions: deleteDashOptions,
  command: deleteDashCommand,
} = require('./delete-dash');

const exportFunctions = {
  createDashOptions,
  createDashCommand,
  deleteDashOptions,
  deleteDashCommand,
};

module.exports = exportFunctions;