const Lodash = require('lodash');
const {
  createProject,
  connect,
  login,
  client,
} = require('../commands');

const {
  BoardType,
  ConnectionType,
} = require('../commands/device');

const commandOptions = {
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
};

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
      return createProject.command(blynk, options);	
    })
    .then((status) => {
      console.log(status);
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
};

const exportFunctions = {
  commandOptions,
  command,
};

module.exports = exportFunctions;