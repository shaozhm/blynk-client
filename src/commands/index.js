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
  loadProfileGzipped,
} = require('./dashboard');

const {
  createWidget,
  getWidget,
  deleteWidget,
} = require('./widget');

const {
  getShareToken,
  refreshShareToken,
  sharing,
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
  //device
  createDevice,
  deleteDevice,
  getDevice,
  updateDevice,
  getDevices,
  //dashboard
  createProject,
  deleteProject,
  activateDashboard,
  deactivateDashboard,
  loadProfileGzipped,
  updateProjectSettings,
  //widget
  createWidget,
  getWidget,
  deleteWidget,
  //sharing
  getShareToken,
  refreshShareToken,
  sharing,
  ping,
  connect,
  login,
  register,
  appSync,
], 'name');

const exportFunctions = {
  //device
  BoardType,
  ConnectionType,
  createDevice,
  deleteDevice,
  getDevice,
  updateDevice,
  getDevices,
  refreshToken,
  //dashboard
  createProject,
  deleteProject,
  activateDashboard,
  deactivateDashboard,
  loadProfileGzipped,
  updateProjectSettings,
  //widget
  createWidget,
  getWidget,
  deleteWidget,
  //sharing
  getShareToken,
  refreshShareToken,
  sharing,
  ping,
  connect,
  login,
  register,
  client,
  appSync,
  commands,
};

module.exports = exportFunctions;