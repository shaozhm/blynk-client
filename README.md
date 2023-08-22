### Steps:
1. Install nodejs (https://nodejs.org/en/download/), select 'ARMv7' version for raspberrypi 3, you can download node-v18.13.0-linux-armv7l this version. then change `.profile` file in your home dir, append the below lines into the file.
``` sh
export NODE_HOME=$HOME/node-v18.13.0-linux-armv7l
export PATH=$PATH:$NODE_HOME/bin
export NODE_PATH=$NODE_HOME/lib/node_modules
```

2. Install some necessary libraries in global path:
``` sh
npm install -g npm
npm install -g onoff
npm install -g blynk-library
npm install -g lodash
```

3. Upload this package into home directory, the package name like `blynk-pi.tar.gz`
``` sh
pi:/home/pi> mkdir blynk-pi
pi:/home/pi> cp blynk-pi.tar.gz blynk-pi
pi:/home/pi> cd blynk-pi
pi:/home/pi/blynk-pi> tar zxvf blynk-pi.tar.gz
pi:/home/pi/blynk-pi> rm blynk-pi.tar.gz
pi:/home/pi/blynk-pi> npm install
```

4. Copy a configuration yaml file into your home directory:
``` sh
pi:/home/pi/blynk-pi> cp config/config.yaml ../blynk-config.yaml
```

5. To ready blynk-pi service:
``` sh 
pi:/home/pi/blynk-pi> sudo cp -f scripts/blynk-pi.service /etc/systemd/system/
> sudo systemctl enable blynk-pi
> sudo systemctl start blynk-pi
```

6. Place the other files(relay_on and relay_off scripts):
``` sh
pi:/home/pi/blynk-pi> cp scripts/relay_on.sh ../
pi:/home/pi/blynk-pi> cp scripts/relay_off.sh ../
pi:/home/pi/blynk-pi> cd ..
pi:~> chmod +x relay_on.sh
pi:~> chmod +x relay_off.sh
```

7. Enable blynk-shutdown service
``` sh 
pi:/home/pi/blynk-pi> cp scripts/blynk-shutdown.sh ../
pi:/home/pi/blynk-pi> sudo cp -f scripts/blynk-shutdown.service /etc/systemd/system/
> sudo systemctl disable blynk-shutdown
> sudo systemctl daemon-reload
> sudo systemctl enable blynk-shutdown
> sudo systemctl start blynk-shutdown
```

8. Reconfigure shairport-sync service
``` sh 
pi:/home/pi/blynk-pi> sudo cp -f scripts/shairport-sync.conf /etc/
pi:/home/pi/blynk-pi> sudo cp -f scripts/shairport-sync.service /lib/systemd/system/
> sudo systemctl daemon-reload
> sudo systemctl restart shairport-sync
> journalctl -u shairport-sync
```

9. change channels for sonos speaker. To change the  `playback_mode` property of the shairport config file `/etc/shairport-sync.conf`. Example: if you want to set your speaker with left channel, you can assign playback_mode = "both left".

10. add a Sleep Proxy Client to Apple TV ... ...
``` sh
pi:/home/pi> sudo pip3 install dnspython
pi:/home/pi> sudo pip3 install netifaces
pi:/home/pi> sudo apt install avahi-utils
pi:/home/pi> git clone https://github.com/awein/SleepProxyClient.git
pi:/home/pi> sudo /usr/bin/bash /home/pi/SleepProxyClient/sleepproxyclient.sh

pi:/home/pi/blynk-pi> sudo cp -f scripts/sleep-proxy.service /etc/systemd/system/
> sudo systemctl disable sleep-proxy
> sudo systemctl daemon-reload
> sudo systemctl enable sleep-proxy
> sudo systemctl start sleep-proxy
```