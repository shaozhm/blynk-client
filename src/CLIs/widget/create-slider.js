const {
  basicCommandOptions,
} = require('./create-button');

const commandOptions = {
  ...basicCommandOptions,
  sendOnReleaseOn: {
    type: 'boolean',
    demandOpiton: false,
    default: true,
  },
  maximumFractionDigits: {
    type: 'int',
    demandOption: false,
    default: 1,
  },
  showValueOn: {
    type: 'boolean',
    demandOption: false,
    default: true,
  },
};

const exportFunctions = {
  commandOptions,
};

module.exports = exportFunctions;