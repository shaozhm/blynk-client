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
  commandObject: assignToken,
} = require('./AssignToken');

const {
  commandObject: getProjectByToken,
} = require('./GetProjectByToken');

const exportFunctions = {
  loadProfileGzipped,
  activateDashboard,
  deactivateDashboard,
  getEnergy,
  assignToken,
  getProjectByToken,
};

module.exports = exportFunctions;