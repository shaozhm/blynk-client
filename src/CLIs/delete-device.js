const {
  deleteDevice,
  connect,
  login,
  client,
} = require('../commands');

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
      return deleteDevice.command(blynk, options);	
    })
    .then((status) => {
      console.log('Delete Device: ', status);
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