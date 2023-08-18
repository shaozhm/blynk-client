const {
  getDevices,
  connect,
  login,
  client,
} = require('../commands');

const commandOptions = {
  dashId: {
    alias: 'd',
    describe: 'dashboard ID',
    type: 'int',
    demandOption: true,
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
      return getDevices.command(blynk, options);	
    })
    .then((data) => {
      const devices = JSON.parse(data);
      console.log('Get Devices: ', devices);
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