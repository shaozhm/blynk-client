const Blynk = require('blynk-library');
const Lodash = require('lodash');
const os = require("os");
const Fs = require('fs');
const Path = require('path');

const {
  read,
} = require('./yaml');

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

const DEFAULT_CONFIGFILE = 'blynk-config.yaml';

const main = (options) => {
  const username = options.u;
  const password = options.p;
  const host = options.h;
  const port = options.t;
  if (username && password && host && port) {
    const blynk = client(host, port);
    const callback = (username, password, appName) => {
      // register.commandOnly(blynk, username, password, appName);
      login.commandOnly(blynk, username, password);
    }
    connect(blynk, callback, username, password, 'Blynk')
    // .then((status) => {
    //   return login.command(blynk, username, password);	
    // })
    .then((status) => {
      return deleteProject.command(blynk, 102);	
    })
    .then((status) => {
      const isShared = false;
      const keepScreenOn = false;
      const theme = 'Blynk';
      const isAppConnectedOn = false;
      const widgetBackgroundOn = false;
      const isNotificationsOff = false;
      return createProject.command(blynk, 102, 'DashTest', isShared, keepScreenOn, theme, isAppConnectedOn, isNotificationsOff, widgetBackgroundOn, 1555, 'S1', BoardType.ESP8266, ConnectionType.WI_FI);	
    })
    .then((status) => {
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
    });
    return;
  }
  const hostName = os.hostname();
  const userHomeDir = os.homedir();
  const userInfo = os.userInfo();
  
  let configPath = Path.join(userHomeDir, DEFAULT_CONFIGFILE);
  if (!Fs.existsSync(configPath) && userInfo.username !== 'pi') {
    configPath = Path.join('/home/pi', DEFAULT_CONFIGFILE);
  }
  if (!Fs.existsSync(configPath)) {
    console.error(`The ${DEFAULT_CONFIGFILE} file doesn't exist in ${userHomeDir} or '/home/pi'`);
    return;
  }

  const Config = read(configPath);

  const {
    controller,
  } = Config;

  if (options.c) {
    console.log(controller);
    return;
  }
  if (options.g) {
    process.stdout.write(`${controller[0][options.g]}`);
    return;
  }

  const idleTime = controller[0]['idle-timeout'];
  const shutdownVPIN = controller[0]['shutdown-virtual-pin'];

  const modules = Lodash.filter(Config.modules, (m) => m.name === hostName);
  if (modules && Array.isArray(modules) && modules.length) {
    if (options.i) {
      console.log(modules);
      return;
    }
    if (options.s) {
      process.stdout.write(`${modules[0][options.s]}`);
      return;
    }

    const piToken = modules[0]['pi-token'];
    const ildleVPIN = modules[0]['idle-counter-pin'];
    if (piToken && ildleVPIN) {

      const exec = require('child_process').exec;

      const execute = (command, callback) => {
        exec(command, (error, stdout, stderr) => callback(stdout));
      };

      const blynk = new Blynk.Blynk(piToken, options = {
        connector : new Blynk.TcpClient( options = { addr: controller[0].address, port: controller[0].port })
      });
      const bridge = new blynk.WidgetBridge(64);

      blynk.on('connect', () => {
        bridge.setAuthToken(controller[0].token);
        bridge.virtualWrite(ildleVPIN, 1);
        execute(`sudo /usr/sbin/shutdown +${idleTime/1000/60}`, (callback) => {
          console.log(callback);
        });
      });

      const switchPin = new blynk.VirtualPin(shutdownVPIN);
      
      switchPin.on('write', (param) => {
        const input = parseInt(param[0]);
        if (input === 0) {
          // reference to: https://stackoverflow.com/questions/23032149/how-do-i-reboot-linux-from-nodejs
          // require('child_process').exec('sudo /sbin/shutdown -r now', function (msg) {
          //   console.log(msg)
          // });
          execute('sudo /sbin/poweroff', (callback) => {
            console.log(callback);
          });
        }
      });

    }
  }
};

const exportFunctions = {
  main,
};

module.exports = exportFunctions;