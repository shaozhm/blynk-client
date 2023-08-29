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
  },
  port: {
    alias: 'p',
    describe: 'port',
    type: 'int',
    demandOption: false,
  },
};

const command = 'login',
      desc = 'login';
const handler = (options, callback) => {
  console.debug(options);
  const {
    token,
    host: optionHost,
    port: optionPort,
  } = options;

  const {
    host: envHost,
    port: envPort,
  } = process.env;

  const host = optionHost ? optionHost : envHost;
  const port = optionPort ? optionPort : envPort;

  if (token && host && port) {
    const blynk = client(host, port);
    const loginCallback = (token) => {
      login.commandOnly(blynk, token);
    };
    connect(blynk, loginCallback, token)
    .then((status) => {
      console.log(status);
      if (callback) {
        callback(blynk, options);
      }
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