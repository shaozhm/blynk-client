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
  updateSettingsOptions,
  updateSettingsCommand,
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

const {
  getShareTokenOptions,
  getShareTokenCommand,
  refreshShareTokenOptions,
  refreshShareTokenCommand,
} = require('./sharing');

const {
  createButtonOptions,
  createButtonCommand,
  createSliderOptions,
} = require('./widget');

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
  updateSettingsOptions,
  updateSettingsCommand,
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
  getShareTokenOptions,
  getShareTokenCommand,
  refreshShareTokenOptions,
  refreshShareTokenCommand,
  createButtonOptions,
  createButtonCommand,
  createSliderOptions,
};

module.exports = exportFunctions;
