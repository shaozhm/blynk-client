const {
  BoardType,
  ConnectionType,
  commandObject: createDevice,
} = require('./CreateDevice');

const {
  commandObject: deleteDevice,
} = require('./DeleteDevice');

const {
  commandObject: getDevice,
} = require('./GetDevice');

const {
  commandObject: updateDevice,
} = require('./UpdateDevice');

const {
  commandObject: getDevices,
} = require('./GetDevices');

const exportFunctions = {
  BoardType,
  ConnectionType,
  createDevice,
  deleteDevice,
  getDevice,
  updateDevice,
  getDevices,
};

module.exports = exportFunctions;