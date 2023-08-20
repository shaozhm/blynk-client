const {
  getEnergy,
} = require('../../commands');

const {
  basic,
} = require('../basic');

const builder = {}

const command = 'get-energy';
const desc = 'get energy';
const callbackCommand = (blynk, options) => (status) => getEnergy.command(blynk, options);
const callbackThen = () => (data) => console.log('Energy: ', data);
const handler = basic(callbackCommand, callbackThen);

const exportFunctions = {
  command,
  desc,
  builder,
  handler,
};

module.exports = exportFunctions;