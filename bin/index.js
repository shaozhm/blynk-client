const dotenv = require('dotenv');
const yargs = require('yargs');
const {
  registerCommand,
  loginCommand,
} = require('../src/blynk-command-test');

// read in settings
dotenv.config();

const loginOptions = (yargs) => {
  yargs.option('u', {
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
  });
}

const commands = yargs
  .usage('Usage: [-u username] [-p password] [-h host] [-t port]')
  .command('register', 'register a new user', loginOptions, (options) => {
    registerCommand(options);
  })
  .command('login', 'connect a blynk server', loginOptions, (options) => {
    loginCommand(options);
  }).argv;