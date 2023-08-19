const {
  commandOptions: registerOptions,
  command: registerCommand,
} = require('./register');

const {
  commandOptions: loginOptions,
  command: loginCommand,
} = require('./login');

const {
  commandOptions: loadProfileOptions,
  command: loadProfileCommand,
} = require('./load-profile');

const {
  createDashOptions,
  createDashCommand,
  deleteDashOptions,
  deleteDashCommand,
  activateDashOptions,
  activateDashCommand,
  deactivateDashOptions,
  deactivateDashCommand,
} = require('./dashboard');

const {
  getDevicesOptions,
  getDevicesCommand,
  getDeviceOptions,
  getDeviceCommand,
  refreshTokenOptions,
  refreshTokenCommand,
  deleteDeviceOptions,
  deleteDeviceCommand,
  createDeviceOptions,
  createDeviceCommand,
  updateDeviceOptions,
  updateDeviceCommand,
} = require('./device');

const exportFunctions = {
  registerOptions,
  registerCommand,
  loginOptions,
  loginCommand,
  createDashOptions,
  createDashCommand,
  deleteDashOptions,
  deleteDashCommand,
  activateDashOptions,
  activateDashCommand,
  deactivateDashOptions,
  deactivateDashCommand,
  loadProfileOptions,
  loadProfileCommand,
  getDevicesOptions,
  getDevicesCommand,
  getDeviceOptions,
  getDeviceCommand,
  refreshTokenOptions,
  refreshTokenCommand,
  deleteDeviceOptions,
  deleteDeviceCommand,
  createDeviceOptions,
  createDeviceCommand,
  updateDeviceOptions,
  updateDeviceCommand,
};

module.exports = exportFunctions;
