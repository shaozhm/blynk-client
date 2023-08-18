const {
  commandOptions: registerOptions,
  command: registerCommand,
} = require('./register');

const {
  commandOptions: loginOptions,
  command: loginCommand,
} = require('./login');

const {
  commandOptions: createDashOptions,
  command: createDashCommand,
} = require('./create-dash');

const {
  commandOptions: loadProfileOptions,
  command: loadProfileCommand,
} = require('./load-profile');

const {
  commandOptions: getDevicesOptions,
  command: getDevicesCommand,
} = require('./get-devices');

const exportFunctions = {
  registerOptions,
  registerCommand,
  loginOptions,
  loginCommand,
  createDashOptions,
  createDashCommand,
  loadProfileOptions,
  loadProfileCommand,
  getDevicesOptions,
  getDevicesCommand,
};

module.exports = exportFunctions;
