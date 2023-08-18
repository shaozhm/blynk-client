const Blynk = require('blynk-library');
const Lodash = require('lodash');
const os = require("os");
const fs = require('fs');
const Path = require('path');
const envfile = require('envfile');

const {
  createProject,
  deleteProject,
  updateProjectSettings,
  BoardType,
  ConnectionType,
  createDevice,
  deleteDevice,
  getDevice,
  updateDevice,
  getDevices,
  refreshToken,
  createWidget,
  deleteWidget,
  getWidget,
  ping,
  connect,
  login,
  register,
  client,
} = require('./commands');

const registerCommand = (options) => {
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

const loginCommand = (options) => {
  console.log(options);
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

const main = (options) => {
  const username = options.u;
  const password = options.p;
  const host = options.h;
  const port = options.t;
  if (username && password && host && port) {
    const blynk = client(host, port);
    const loginCallback = (username, password, appName) => {
      login.commandOnly(blynk, username, password);
    };
    const appname = 'blynk';
    connect(blynk, loginCallback, username, password, appname)
    .then((status) => {
      return deleteProject.command(blynk, 102);	
    })
    .then((status) => {
      // create a new project
      const isShared = false;
      const keepScreenOn = false;
      const theme = 'Blynk';
      const isAppConnectedOn = false;
      const widgetBackgroundOn = false;
      const isNotificationsOff = false;
      return createProject.command(blynk, 102, 'DashTest', isShared, keepScreenOn, theme, isAppConnectedOn, isNotificationsOff, widgetBackgroundOn, 1555, 'S1', BoardType.ESP8266, ConnectionType.WI_FI);	
    })
    .then((status) => {
      //
      return createDevice.command(blynk, 102, 1562, 'T1', BoardType.NodeMCU, ConnectionType.WI_FI);	
    })
    .then((status) => {
      return updateDevice.command(blynk, 102, 1562, 'T2', BoardType.ESP8266, ConnectionType.WI_FI);	
    })
    .then((data) => {
      const newDevice = JSON.parse(data);
      console.log('New Device: ', newDevice);

      return getDevice.command(blynk, 102, 1562);
    })
    .then((data) => {
      const device = JSON.parse(data);
      console.log('Get Device: ', device);
      return refreshToken.command(blynk, 102, 1562);
    })
    .then((data) => {
      console.log('Device Token: ', data);
      return getDevices.command(blynk, 102);
    })
    .then((data) => {
      const devices = JSON.parse(data);
      console.log('Get Devices: ', devices);

      const dashboardId = 102;
      const deviceId = 1562;
      const widgetId = 1;
      const widgetType = 'BUTTON';
      const label = 'music';
      const onLabel = 'on';
      const offLabel = 'off';
      const x = 0, y = 0;
      const width =2, height =2;
      const pwmMode = false;
      const pushMode = true;
      const pinType = 'DIGITAL';
      const pinNumber = 5;
      return createWidget.command(blynk, dashboardId, deviceId, widgetId, widgetType, label, onLabel, offLabel, x, y, width, height, pwmMode, pushMode, pinType, pinNumber);
    })
    .then((status) => {
      const dashboardId = 102;
      const widgetId = 1;
      return getWidget.command(blynk, dashboardId, widgetId);
    })
    .then((data) => {
      const widget = JSON.parse(data);
      console.log('Get Widget: ', widget);

      // return deleteDevice.command(blynk, 102, device.id);
    })
    // .then((status) => {
    //   return ping.command(blynk);	
    // })
    .catch((error) => {
      console.log("Error: " + error);
      process.exit();
    })
    .finally(() => {
      if (blynk && blynk.socket) {
        blynk.socket.destroy();
      }
    });
    return;
  }
};

const exportFunctions = {
  registerCommand,
  loginCommand,
  main,
};

module.exports = exportFunctions;