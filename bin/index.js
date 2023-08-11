const dotenv = require('dotenv');
const yargs = require('yargs');
const { main } = require('../src/blynk-pi');

// read in settings
dotenv.config();

const options = yargs
  .usage('Usage: [-u username] [-p password] [-h host] [-t port] | [-i] [-c] [-s] [-g]')
  .option('u', {
    alias: 'username',
    describe: 'username',
    type: 'string',
    demandOption: false,
  })
  .option('p', {
    alias: 'password',
    describe: 'password',
    type: 'string',
    demandOption: false,
  })
  .option('h', {
    alias: 'host',
    describe: 'host',
    type: 'string',
    demandOption: false,
  })
  .option('t', {
    alias: 'port',
    describe: 'port',
    type: 'int',
    demandOption: false,
  })
  .option('i', {
    alias: 'info',
    describe: 'information about this node',
    type: 'boolean',
    demandOption: false,
  })
  .option('c', {
    alias: 'controller',
    describe: 'information about the controller',
    type: 'boolean',
    default: false,
    demandOption: false,
  })
  .option('s', {
    alias: 'search',
    describe: 'return the value of the property in this node',
    type: 'string',
    default: false,
    demandOption: false,
  })
  .option('g', {
    alias: 'get',
    describe: 'return the value of the property in the controller',
    type: 'string',
    default: false,
    demandOption: false,
  })
  .argv;

main(options);