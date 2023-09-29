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
