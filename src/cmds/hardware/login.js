const {
  connect,
  client,
} = require('../../commands');

const {
  commandObject: login,
} = require('../../commands/hardware/Login');

const basic= (callbackCommand, callbackThen) => (options) => {
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
    .then(callbackCommand(blynk, options))
    .then(callbackThen())
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
  basic,
};

module.exports = exportFunctions;