const fs = require('fs');
const envfile = require('envfile');
const {
  connect,
  login,
  client,
} = require('../commands');

const {
  commandOptions: registerOptions,
} = require('./register');

const commandOptions = {
  ...registerOptions,
  appname: {
    alias: 'n',
    describe: 'app name',
    type: 'string',
    demandOption: false,
    default: 'Blynk',
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
  } = options;
  if (username && password && host && port) {
    const blynk = client(host, port);
    const loginCallback = (username, password, appName) => {
      login.commandOnly(blynk, username, password);
    };
    connect(blynk, loginCallback, username, password, appname)
    .then((status) => {
      const dotenv = {
        username,
        password,
        host,
        port,
        appname,
      };
      fs.writeFileSync('./.env', envfile.stringify(dotenv));
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