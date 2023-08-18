const {
  loadProfileGzipped,
  connect,
  login,
  client,
} = require('../commands');

const commandOptions = {
  dashId: {
    alias: 'd',
    describe: 'dashboard ID',
    type: 'int',
    demandOption: false,
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
      return loadProfileGzipped.command(blynk);	
    })
    .then((data) => {
      console.log(JSON.stringify(JSON.parse(data), null, 2));
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