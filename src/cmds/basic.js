const {
  connect,
  login,
  client,
} = require('../commands');

const basic= (...callbackCommands) => (options) => {
  console.debug(options);
  let username, password, host, port, tls, appname;
  if (options && options.login) {
    username = options.login.username;
    password = options.login.password;
    host = options.login.host;
    port = options.login.port;
    tls = options.login.tls;
    appname = options.login.appname;
  } else {
    username = process.env.username;
    password = process.env.password;
    host = process.env.host;
    port = process.env.port;
    tls = process.env.tls;
    appname = process.env.appname;
  }

  console.debug(username, password, host, port);
  if (username && password && host && port) {
    console.debug(username, password, host, port, appname);
    const blynk = client(host, port);
    const loginCallback = (username, password, appName) => {
      login.commandOnly(blynk, username, password);
    };
    let p = connect(blynk, loginCallback, tls, username, password, appname);
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