const {
  commandObject: createProject,
} = require('./CreateProject');

const {
  commandObject: deleteProject,
} = require('./DeleteProject');

const {
  commandObject: activateDashboard,
} = require('./ActivateDashboard');

const {
  commandObject: deactivateDashboard,
} = require('./DeactivateDashboard');

const {
  commandObject: updateProjectSettings,
} = require('./UpdateProjectSettings');

const {
  commandObject: loadProfileGzipped,
} = require('./LoadProfileGziped');

const exportFunctions = {
  createProject,
  deleteProject,
  activateDashboard,
  deactivateDashboard,
  updateProjectSettings,
  loadProfileGzipped,
};

module.exports = exportFunctions;