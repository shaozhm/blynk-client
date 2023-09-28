#!/bin/bash

NODE_HOME="/home/pi/node-v18.13.0-linux-armv7l"
BLYNK_AGENT_HOME="/home/pi/blynk-pi"
SONOSPI_TOKEN=$(${NODE_HOME}/bin/node ${BLYNK_AGENT_HOME} -g token)
IDLE_VPIN=$(${NODE_HOME}/bin/node ${BLYNK_AGENT_HOME} -s idle-counter-pin)
SWITCH_VPIN=$(${NODE_HOME}/bin/node ${BLYNK_AGENT_HOME} -s switch-button-pin)
/usr/bin/python /home/pi/blynk-library/scripts/blynk_ctrl.py -s sonos.local -p 8442 -t $SONOSPI_TOKEN -vw $IDLE_VPIN 0
/usr/bin/python /home/pi/blynk-library/scripts/blynk_ctrl.py -s sonos.local -p 8442 -t $SONOSPI_TOKEN -vw $SWITCH_VPIN 0
