const {
  connect,
  client,
} = require('../../commands');

const {
  commandObject: login,
} = require('../../commands/hardware/Login');

const builder = {
  token: {
    alias: 't',
    describe: 'device token',
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
    alias: 'p',
    describe: 'port',
    type: 'int',
    demandOption: false,
    default: 9443,
  },
};

const command = 'login',
      desc = 'login';
const handler = (options) => {
  console.debug(options);
  const {
    token,
    host,
    port,
  } = options;
  if (token && host && port) {
    const blynk = client(host, port);
    const loginCallback = (token) => {
      login.commandOnly(blynk, token);
    };
    connect(blynk, loginCallback, token)
    .then((status) => {
      //todolist
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
  command,
  desc,
  builder,
  handler,
};

module.exports = exportFunctions;