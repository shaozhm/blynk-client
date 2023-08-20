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

const {
  commandObject: getProjectByToken,
} = require('./GetProjectByToken');

const exportFunctions = {
  loadProfileGzipped,
  activateDashboard,
  deactivateDashboard,
  getEnergy,
  getProjectByToken,
};

module.exports = exportFunctions;