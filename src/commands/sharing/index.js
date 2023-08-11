const {
  commandObject: getShareToken,
} = require('./GetShareToken');

const {
  commandObject: refreshShareToken,
} = require('./RefreshShareToken');

const exportFunctions = {
  getShareToken,
  refreshShareToken,
};

module.exports = exportFunctions;