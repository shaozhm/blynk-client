const dotenv = require('dotenv');
const yargs = require('yargs');
const {
  main,
} = require('../src/blynk-command-test');
const {
  registerOptions,
  registerCommand,
  loginOptions,
  loginCommand,
  createDashOptions,
  createDashCommand,
  loadProfileOptions,
  loadProfileCommand,
  getDevicesOptions,
  getDevicesCommand,
  getDeviceOptions,
  getDeviceCommand,
  refreshTokenOptions,
  refreshTokenCommand,
  deleteDeviceOptions,
  deleteDeviceCommand,
  createDeviceOptions,
  createDeviceCommand,
} = require('../src/CLIs');

dotenv.config();



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
  .command('load-profile', 'load profile', (yargs) => {
    yargs.options(loadProfileOptions)
  }, (options) => {
    loadProfileCommand(options);
  })
  .command('get-devices', 'list devices by a specific dashboard', (yargs) => {
    yargs.options(getDevicesOptions)
  }, (options) => {
    getDevicesCommand(options);
  })
  .command('get-device', 'see a specific device in a specific dashboard', (yargs) => {
    yargs.options(getDeviceOptions)
  }, (options) => {
    getDeviceCommand(options);
  })
  .command('refresh-token', 'refresh a token of a specific device in a specific dashboard', (yargs) => {
    yargs.options(refreshTokenOptions)
  }, (options) => {
    refreshTokenCommand(options);
  })
  .command('delete-device', 'delete a specific device in a specific dashboard', (yargs) => {
    yargs.options(deleteDeviceOptions)
  }, (options) => {
    deleteDeviceCommand(options);
  })
  .command('create-device', 'create a specific device in a specific dashboard', (yargs) => {
    yargs.options(createDeviceOptions)
  }, (options) => {
    createDeviceCommand(options);
  })
  .command('test', 'testing', loginOptions, (options) => {
    main(options);
  }).argv;