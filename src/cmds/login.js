const fs = require('fs');
const envfile = require('envfile');
const {
  connect,
  login,
  client,
} = require('../commands');

const {
  builder: registerOptions,
} = require('./register');

const builder = {
  ...registerOptions,
  appname: {
    alias: 'n',
    describe: 'app name',
    type: 'string',
    demandOption: false,
    default: 'Blynk',
  },
  keep: {
    alias: 'k',
    describe: 'keep session',
    type: 'boolean',
    demandOption: false,
    default: false,
  }
}

const command = 'login',
      desc = 'login';
const handler = (options) => {
  console.debug(options);
  const {
    username,
    password,
    host,
    port,
    tls,
    appname,
    keep,
  } = options;
  if (username && password && host && port) {
    const blynk = client(host, port);
    const loginCallback = (username, password, appName) => {
      login.commandOnly(blynk, username, password);
    };
    connect(blynk, loginCallback, tls, username, password, appname)
    .then((status) => {
      const dotenv = {
        username,
        password,
        host,
        port,
        tls,
        appname,
      };
      fs.writeFileSync('./.env', envfile.stringify(dotenv));
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      if (!keep && blynk && blynk.socket) {
        blynk.socket.destroy();
      }
    });
  }
};

const exportFunctions = {
  command,
  desc,
  builder,
  handler,
};

module.exports = exportFunctions;