const Lodash = require('lodash');

const {
  BoardType,
  ConnectionType,
  createDevice,
  deleteDevice,
  getDevice,
  updateDevice,
  getDevices,
  refreshToken,
} = require('./device');

const {
  createProject,
  deleteProject,
  activateDashboard,
  deactivateDashboard,
  updateProjectSettings,
} = require('./dashboard');

const {
  createWidget,
  getWidget,
  deleteWidget,
} = require('./widget');

const {
  getShareToken,
  refreshShareToken,
} = require('./sharing');

const {
  commandObject: ping,
} = require('./Ping');

const {
  commandObject: appSync,
} = require('./AppSync');

const {
  client,
  connect,
} = require('./connect');

const {
  commandObject: login,
} = require('./Login');

const {
  commandObject: register,
} = require('./Register');

const commands = Lodash.keyBy([
  createDevice,
  deleteDevice,
  getDevice,
  updateDevice,
  getDevices,
  createProject,
  deleteProject,
  activateDashboard,
  deactivateDashboard,
  updateProjectSettings,
  createWidget,
  getWidget,
  deleteWidget,
  getShareToken,
  refreshShareToken,
  ping,
  connect,
  login,
  register,
  appSync,
], 'name');

const exportFunctions = {
  BoardType,
  ConnectionType,
  createDevice,
  deleteDevice,
  getDevice,
  updateDevice,
  getDevices,
  refreshToken,
  createProject,
  deleteProject,
  activateDashboard,
  deactivateDashboard,
  updateProjectSettings,
  createWidget,
  getWidget,
  deleteWidget,
  getShareToken,
  refreshShareToken,
  ping,
  connect,
  login,
  register,
  client,
  appSync,
  commands,
};

module.exports = exportFunctions;