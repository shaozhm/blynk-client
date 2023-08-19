const {
  commandOptions: getShareTokenOptions,
  command: getShareTokenCommand,
} = require('./get-share-token');

const {
  commandOptions: refreshShareTokenOptions,
  command: refreshShareTokenCommand,
} = require('./refresh-share-token');

const exportFunctions = {
  getShareTokenOptions,
  getShareTokenCommand,
  refreshShareTokenOptions,
  refreshShareTokenCommand,
};

module.exports = exportFunctions;