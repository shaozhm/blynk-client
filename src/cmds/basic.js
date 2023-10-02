const {
  connect,
  login,
  client,
} = require('../commands');

const basic= (...callbackCommands) => (options) => {
  console.debug(options);
  const {
    username,
    password,
    host,
    port,
    appname,
  } = process.env;
  console.debug(username, password, host, port);
  if (username && password && host && port) {
    console.debug(username, password, host, port, appname);
    const blynk = client(host, port);
    const loginCallback = (username, password, appName) => {
      login.commandOnly(blynk, username, password);
    };
    let p = connect(blynk, loginCallback, username, password, appname);
    if (callbackCommands && Array.isArray(callbackCommands)) {
      callbackCommands.forEach((command) => {
        p = p.then(command(blynk, options));
      });
    }
    p.catch((error) => {
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