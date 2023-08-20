const {
  commandObject: createProject,
} = require('./CreateProject');

const {
  commandObject: deleteProject,
} = require('./DeleteProject');

const {
  commandObject: updateProjectSettings,
} = require('./UpdateProjectSettings');

const exportFunctions = {
  createProject,
  deleteProject,
  updateProjectSettings,
};

module.exports = exportFunctions;