const Lodash = require('lodash');

const {
  BoardType,
  ConnectionType,
  createDevice,
  deleteDevice,
  getDevice,
  updateDevice,
  getDevices,
} = require('./device');

const {
  createProject,
  deleteProject,
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
  sharing,
} = require('./sharing');

const {
  loadProfileGzipped,
  activateDashboard,
  deactivateDashboard,
  getEnergy,
  assignToken,
  getProjectByToken,
  refreshToken,
  getCloneCode,
  getProjectByClonedToken,
  hardware,
  ping,
} = require('./main');

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
  //main
  loadProfileGzipped,
  activateDashboard,
  deactivateDashboard,
  getEnergy,
  assignToken,
  getProjectByToken,
  refreshToken,
  getCloneCode,
  getProjectByClonedToken,
  hardware,
  //device
  createDevice,
  deleteDevice,
  getDevice,
  updateDevice,
  getDevices,
  //dashboard
  createProject,
  deleteProject,
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
  //main
  loadProfileGzipped,
  activateDashboard,
  deactivateDashboard,
  getEnergy,
  assignToken,
  getProjectByToken,
  refreshToken,
  getCloneCode,
  getProjectByClonedToken,
  hardware,
  //device
  BoardType,
  ConnectionType,
  createDevice,
  deleteDevice,
  getDevice,
  updateDevice,
  getDevices,
  //dashboard
  createProject,
  deleteProject,
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