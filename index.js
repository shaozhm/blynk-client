const {
  createProject,
  deleteProject,
  updateProjectSettings,
} = require('./src/commands/dashboard');

const {
  BoardType,
  ConnectionType,
  createDevice,
  deleteDevice,
  getDevice,
  updateDevice,
  getDevices,
} = require('./src/commands/device');

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
} = require('./src/commands/main');

const {
  createWidget,
  deleteWidget,
  getWidget,
} = require('./src/commands/widget');

const {
  getShareToken,
  refreshShareToken,
  sharing,
} = require('./src/commands/sharing');

const {
  basic: appBasic,
} = require('./src/cmds/basic');

const {
  basic: hardwareBasic,
} = require('./src/cmds/hardware/login');

const exportFunctions = {
  //dashboard
  createProject,
  deleteProject,
  updateProjectSettings,
  //device
  BoardType,
  ConnectionType,
  createDevice,
  deleteDevice,
  getDevice,
  updateDevice,
  getDevices,
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
  //widget
  createWidget,
  deleteWidget,
  getWidget,
  //sharing
  getShareToken,
  refreshShareToken,
  sharing,
  //cmds
  appBasic,
  hardwareBasic,
};

module.exports = exportFunctions;