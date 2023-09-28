#!/bin/bash

#echo low > /sys/class/gpio/gpio25/direction
echo 0 > /sys/class/leds/music/brightness

NODE_HOME="/home/pi/node-v18.13.0-linux-armv7l"
BLYNK_AGENT_HOME="/home/pi/blynk-pi"
SONOSPI_TOKEN=$(${NODE_HOME}/bin/node ${BLYNK_AGENT_HOME} -g token)
VPORT=$(${NODE_HOME}/bin/node ${BLYNK_AGENT_HOME} -s idle-counter-pin)
TIMEOUT=$(${NODE_HOME}/bin/node ${BLYNK_AGENT_HOME} -g idle-timeout)

python /home/pi/blynk-library/scripts/blynk_ctrl.py -s sonos.local -p 8442 -t ${SONOSPI_TOKEN} -vw ${VPORT} 1

sudo /usr/sbin/shutdown -P +$(expr ${TIMEOUT} / 1000 / 60)
exit 0
