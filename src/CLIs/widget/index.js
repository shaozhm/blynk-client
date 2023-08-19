const {
  commandOptions: createButtonOptions,
  command: createButtonCommand,
} = require('./create-button');

const {
  commandOptions: createSliderOptions,
} = require('./create-slider');

const exportFunctions = {
  createButtonOptions,
  createButtonCommand,
  createSliderOptions,
};

module.exports = exportFunctions;