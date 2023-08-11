const {
  commandObject: createWidget,
} = require('./CreateWidget');

const {
  commandObject: deleteWidget,
} = require('./DeleteWidget');

const {
  commandObject: getWidget,
} = require('./GetWidget');

const exportFunctions = {
  createWidget,
  deleteWidget,
  getWidget,
};

module.exports = exportFunctions;