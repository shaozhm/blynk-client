const {
  commandOptions: getWidgetOptions,
  command: getWidgetCommand,
} = require('./get-widget');

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
  getWidgetOptions,
  getWidgetCommand,
};

module.exports = exportFunctions;