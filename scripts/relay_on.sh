#!/bin/bash

#echo high > /sys/class/gpio/gpio25/direction
echo 1 > /sys/class/leds/music/brightness

NODE_HOME="/home/pi/node-v18.13.0-linux-armv7l"
BLYNK_AGENT_HOME="/home/pi/blynk-pi"
SONOSPI_TOKEN=$(${NODE_HOME}/bin/node ${BLYNK_AGENT_HOME} -g token)
VPORT=$(${NODE_HOME}/bin/node ${BLYNK_AGENT_HOME} -s idle-counter-pin)

python /home/pi/blynk-library/scripts/blynk_ctrl.py -s sonos.local -p 8442 -t ${SONOSPI_TOKEN} -vw ${VPORT} 0

sudo /usr/sbin/shutdown -c
exit 0
