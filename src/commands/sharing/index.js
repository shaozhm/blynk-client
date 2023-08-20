const {
  commandObject: getShareToken,
} = require('./GetShareToken');

const {
  commandObject: refreshShareToken,
} = require('./RefreshShareToken');

const {
  commandObject: sharing,
} = require('./Sharing');

const exportFunctions = {
  getShareToken,
  refreshShareToken,
  sharing,
};

module.exports = exportFunctions;