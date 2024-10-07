## Blynk Client created by zhimin
```sh
> node .
Commands:
  dash <command>      operations for dashboards
  device <command>    operations for devices
  hardware <command>  operations for hardwares
  login               login
  main <command>      core operations
  register            register a new user
  share <command>     operations for dashboard sharing
  widget <command>    operations for widgets

Options:
  --version  Show version number                                       [boolean]
  --help     Show help                                                 [boolean]

```

The first thing is login:
```sh
> node . login
Options:
  --version       Show version number                                  [boolean]
  --help          Show help                                            [boolean]
  --username, -u  username                                   [string] [required]
  --password, -w  password                                   [string] [required]
  --host, -h      host                           [string] [default: "localhost"]
  --port, -p      port                                  [number] [default: 9443]
  --appname, -n   app name                           [string] [default: "Blynk"]

> node . login  -u shaozhm@gmail.com -w admin -h sonos.local
{
  _: [ 'login' ],
  u: 'shaozhm@gmail.com',
  username: 'shaozhm@gmail.com',
  w: 'admin',
  password: 'admin',
  h: 'sonos.local',
  host: 'sonos.local',
  port: 9443,
  p: 9443,
  appname: 'Blynk',
  n: 'Blynk',
  '$0': ''
}
body length:  62
```

Your credential stores in .env file 
```sh
> cat .env
username=shaozhm@gmail.com
password=admin
host=sonos.local
port=9443
appname=Blynk
```

Main DashBoard ID: 1067362704

| machine            | token                              | hardware     | js program    | device ID (name) |
| :----------------  | :--------------------------------- | :----------- | :----------   | :--------------- |
| sonos.local        | BO9Ej28AzpoEsaCs0WXiS3mqSO2KE8mZ   | Raspberry Pi | blynk-sonospi | 28256 (sonospi)  |
| f1.local           | LNCbSgxT5US_jRoRxEk3kUC2Vjtcs3JE   | Raspberry Pi | blynk-pi      | 31856 (f1pi)     |
| NF1                | TWeLjKM2HPMbpThb9wc9Py0OwGHWKfII   | NodeMCU      |               | 51122 (NF1)      |
| t1.local           | 9KX59DS8BEhdd7Ab1wlb-DeFKq9zuMgY   | Raspberry Pi | blynk-pi      | 19453 (t1pi)     |
| NT1                | l-ENcwSVVQGsmfZyjD-XiwXS7yoUIKEg   | NodeMCU      |               | 50450 (NT1)      |
| sub.local          | VHCZjPQkNy6DP_aqojIjTSczaIhEW2h8   | Raspberry Pi | blynk-pi      | 77235 (subpi)    |
| NSUB               | QaW4U6_jzOKbthNeebh1mG2vGw_GStw_   | NodeMCU      |               | 95664 (NSUB)     |
| s1l.local          | 3svW_Nf21qz4zmN1_X9AB_1TuVcGOiNs   | Raspberry Pi | blynk-pi      | 50138 (s1lpi)    |
| NS1L               | jUZMCbN6q5j1VonTxZDXa4x9gmAnGpsr   | NodeMCU      |               | 0     (NS1L)     |
| s1r.local          | EfZQYYHaMvN-lZ-NjQE4iPa0jSc9gg_A   | Raspberry Pi | blynk-pi      | 85213 (s1rpi)    |
| NS1R               | vyt4OSy-c0AbNFKkzdSOl9W0_TTTPzzx   | NodeMCU      |               | 65894 (NS1R)     |

Commands:
* sonos.local: blynk-client device get --dashId 1067362704 --deviceId 28256
* f1.local:    blynk-client device get --dashId 1067362704 --deviceId 31856
* t1.local:    blynk-client device get --dashId 1067362704 --deviceId 19453
* sub.local:   blynk-client device get --dashId 1067362704 --deviceId 77235
* s1l.local:   blynk-client device get --dashId 1067362704 --deviceId 50138
* s1r.local:   blynk-client device get --dashId 1067362704 --deviceId 85213

``` js
Get Device:  {
  id: 77235,
  name: 'subpi',
  boardType: 'Raspberry Pi 2/A+/B+',
  token: 'VHCZjPQkNy6DP_aqojIjTSczaIhEW2h8',
  vendor: 'subpi',
  connectionType: 'ETHERNET',
  status: 'OFFLINE',
  disconnectTime: 1728292442954,
  connectTime: 1728291241116,
  firstConnectTime: 1674996207854,
  dataReceivedAt: 1728292451361,
  lastLoggedIP: '192.168.125.159',
  hardwareInfo: {
    blynkVersion: '0.5.4',
    boardType: 'js',
    heartbeatInterval: 0,
    buffIn: 4096
  },
  isUserIcon: false
}
```

* NF1:  blynk-client device get --dashId 1067362704 --deviceId 51122
* NT1:  blynk-client device get --dashId 1067362704 --deviceId 50450
* NSUB: blynk-client device get --dashId 1067362704 --deviceId 95664
* NS1L: blynk-client device get --dashId 1067362704 --deviceId 0
* NS1R: blynk-client device get --dashId 1067362704 --deviceId 65894

``` js
Get Device:  {
  id: 51122,
  name: 'NF1',
  boardType: 'NodeMCU',
  token: 'TWeLjKM2HPMbpThb9wc9Py0OwGHWKfII',
  vendor: 'NF1',
  connectionType: 'WI_FI',
  status: 'ONLINE',
  disconnectTime: 1681096151373,
  connectTime: 1728287954446,
  firstConnectTime: 1653106620319,
  dataReceivedAt: 1728292460837,
  lastLoggedIP: '192.168.125.174',
  hardwareInfo: {
    blynkVersion: '1.0.1',
    boardType: 'ESP8266',
    build: 'Sep 24 2023 20:39:00',
    heartbeatInterval: 45,
    buffIn: 1024
  },
  isUserIcon: false
}
```