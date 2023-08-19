const Lodash = require('lodash');
const {
  updateDevice,
  connect,
  login,
  client,
} = require('../../commands');

const {
  BoardType,
  ConnectionType,
} = require('../../commands/device');

const commandOptions = {
  dashId: {
    alias: 'p',
    describe: 'dashboard ID',
    type: 'int',
    demandOption: true,
  },
  deviceId: {
    alias: 'd',
    describe: 'device ID',
    type: 'int',
    demandOption: true,
  },
  deviceName: {
    alias: 'n',
    describe: 'device name',
    type: 'string',
    demandOption: true,
  },
  boardType: {
    alias: 'b',
    describe: 'board type',
    type: 'string',
    demandOption: false,
    choices: Lodash.values(BoardType),
    default: BoardType.ESP8266,
  },
  connectionType: {
    alias: 'c',
    type: 'string',
    demandOption: false,
    choices: Lodash.values(ConnectionType),
    default: ConnectionType.WI_FI,
  }
}

const command = (options) => {
  console.debug(options);
  const {
    username,
    password,
    host,
    port,
    appname,
  } = process.env;
  if (username && password && host && port) {
    console.debug(username, password, host, port, appname);
    const blynk = client(host, port);
    const loginCallback = (username, password, appName) => {
      login.commandOnly(blynk, username, password);
    };
    connect(blynk, loginCallback, username, password, appname)
    .then((status) => {
      return updateDevice.command(blynk, options);	
    })
    .then((status) => {
      // console.log('Delete Device: ', status);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      if (blynk && blynk.socket) {
        blynk.socket.destroy();
      }
    });
  }
}

const exportFunctions = {
  commandOptions,
  command,
};

module.exports = exportFunctions;