const {
  connect,
  register,
  client,
} = require('../commands');

const commandOptions = {
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

const command = (options) => {
  const username = options.u;
  const password = options.p;
  const host = options.h;
  const port = options.t;

  if (username && password && host && port) {
    const blynk = client(host, port);
    //if we want to register a new user, and then login.
    const registerCallback = (username, password, appName) => {
      register.commandOnly(blynk, username, password, appName);
    };

    const appname = 'Blynk';
    connect(blynk, registerCallback, username, password, appname)
    .then((status) => {
      console.log(`[${status}]: successfully`)	
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      if (blynk && blynk.socket) {
        blynk.socket.destroy();
      }
    })
  }
};

const exportFunctions = {
  commandOptions,
  command,
};

module.exports = exportFunctions;