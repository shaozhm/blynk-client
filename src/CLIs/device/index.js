const {
  commandOptions: getDevicesOptions,
  command: getDevicesCommand,
} = require('./get-devices');

const {
  commandOptions: getDeviceOptions,
  command: getDeviceCommand,
} = require('./get-device');

const {
  commandOptions: refreshTokenOptions,
  command: refreshTokenCommand,
} = require('./refresh-token');

const {
  commandOptions: deleteDeviceOptions,
  command: deleteDeviceCommand,
} = require('./delete-device');

const {
  commandOptions: createDeviceOptions,
  command: createDeviceCommand,
} = require('./create-device');

const {
  commandOptions: updateDeviceOptions,
  command: updateDeviceCommand,
} = require('./update-device');

const exportFunctions = {
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