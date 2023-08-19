const {
  commandOptions: createButtonOptions,
  command: createButtonCommand,
} = require('./create-button');

const {
  commandOptions: createSliderOptions,
  command: createSliderCommand,
} = require('./create-slider');

const exportFunctions = {
  createButtonOptions,
  createButtonCommand,
  createSliderOptions,
  createSliderCommand,
};

module.exports = exportFunctions;