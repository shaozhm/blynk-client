const {
  ping,
} = require('../../commands');

const {
  basic,
} = require('../basic');

const builder = {}

const command = 'ping';
const desc = 'ping blynk server';
const callbackCommand = (blynk, options) => (status) => ping.command(blynk, options);
const callbackThen = () => (status) => console.log('Ping: ', status);
const handler = basic(callbackCommand, callbackThen);

const exportFunctions = {
  command,
  desc,
  builder,
  handler,
};

module.exports = exportFunctions;