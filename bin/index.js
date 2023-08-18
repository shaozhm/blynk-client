const dotenv = require('dotenv');
const yargs = require('yargs');
const {
  registerCommand,
  loginCommand,
  main,
} = require('../src/blynk-command-test');

dotenv.config();

const registerOptions = {
  username: {
    alias: 'u',
    describe: 'username',
    type: 'string',
    demandOption: true,
  },
  password: {
    alias: 'p',
    describe: 'password',
    type: 'string',
    demandOption: true,
  },
  host: {
    alias: 'h',
    describe: 'host',
    type: 'string',
    demandOption: false,
    default: 'localhost',
  },
  port: {
    alias: 't',
    describe: 'port',
    type: 'int',
    demandOption: false,
    default: 9443,
  }
};

const loginOptions = {
  ...registerOptions,
  appname: {
    alias: 'n',
    describe: 'app name',
    type: 'string',
    demandOption: false,
    default: 'Blynk',
  }
}

const commands = yargs
  .usage('Usage: register | login')
  .command('register', 'register a new user', (yargs) => {
    yargs.options(registerOptions)
  }, (options) => {
    registerCommand(options);
  })
  .command('login', 'connect a blynk server', (yargs) => {
    yargs.options(loginOptions)
  }, (options) => {
    loginCommand(options);
  })
  .command('test', 'testing', loginOptions, (options) => {
    main(options);
  }).argv;