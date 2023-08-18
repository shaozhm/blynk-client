const dotenv = require('dotenv');
const yargs = require('yargs');
const Lodash = require('lodash');
const {
  registerCommand,
  loginCommand,
  createDashCommand,
  main,
} = require('../src/blynk-command-test');

const {
  BoardType,
  ConnectionType,
} = require('../src/commands/device');

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

const createDashOptions = {
  id: {
    type: 'int',
    demandOption: true,
  },
  projectName: {
    type: 'string',
    demandOption: true,
  },
  isShared: {
    type: 'boolean',
    demandOption: false,
    default: false,
  },
  keepScreenOn: {
    type: 'boolean',
    demandOption: false,
    default: false,
  },
  theme: {
    type: 'string',
    demandOption: false,
    default: 'Blynk',
  },
  isAppConnectedOn: {
    type: 'boolean',
    demandOption: false,
    default: false,
  },
  widgetBackgroundOn: {
    type: 'boolean',
    demandOption: false,
    default: false,
  },
  isNotificationsOff: {
    type: 'boolean',
    demandOption: false,
    default: false,
  },
	deviceId: {
    type: 'int',
    demandOption: false,
    default: 0,
  },
	deviceName: {
    type: 'string',
    demandOption: false,
    default: 'DefaultDevice',
  },
	boardType: {
    type: 'string',
    demandOption: false,
    choices: Lodash.values(BoardType),
    default: BoardType.ESP8266,
  },
	connectionType: {
    type: 'string',
    demandOption: false,
    choices: Lodash.values(ConnectionType),
    default: ConnectionType.WI_FI,
  },
}

const commands = yargs
  .usage('Usage: register | login | create-dash | test')
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
  .command('create-dash', 'create a new dashboard', (yargs) => {
    yargs.options(createDashOptions)
  }, (options) => {
    createDashCommand(options);
  })
  .command('test', 'testing', loginOptions, (options) => {
    main(options);
  }).argv;