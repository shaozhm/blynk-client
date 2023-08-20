const {
  commandObject: loadProfileGzipped,
} = require('./LoadProfileGziped');

const {
  commandObject: activateDashboard,
} = require('./ActivateDashboard');

const {
  commandObject: deactivateDashboard,
} = require('./DeactivateDashboard');

const exportFunctions = {
  loadProfileGzipped,
  activateDashboard,
  deactivateDashboard,
};

module.exports = exportFunctions;