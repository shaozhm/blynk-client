const {
  activateDashboard,
} = require('../../commands');

const {
  basic,
} = require('../basic');

const builder = {
  id: {
    type: 'int',
    demandOption: true,
  },
}

const command = 'activate';
const desc = 'activate a dashboard';

const callbackCommand = (blynk, options) => (status) => activateDashboard.command(blynk, options);
const callbackThen = () => (status) => console.log(status);
const handler = basic(callbackCommand, callbackThen);

const exportFunctions = {
  command,
  desc,
  builder,
  handler,
};

module.exports = exportFunctions;