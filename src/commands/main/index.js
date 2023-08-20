const {
  commandObject: loadProfileGzipped,
} = require('./LoadProfileGziped');

const {
  commandObject: activateDashboard,
} = require('./ActivateDashboard');

const {
  commandObject: deactivateDashboard,
} = require('./DeactivateDashboard');

const {
  commandObject: getEnergy,
} = require('./GetEnergy');

const exportFunctions = {
  loadProfileGzipped,
  activateDashboard,
  deactivateDashboard,
  getEnergy,
};

module.exports = exportFunctions;