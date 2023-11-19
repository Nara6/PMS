#!/bin/bash

L="----------------------------------------------------------"
Log=$(git log -n 1 --pretty=format:"<b>COMMITER</b>: %cN %n<b>DATE</b>: %ci %n<b>MESSAGE</b>: %s")

# Project=$(git remote -v | awk '/^origin.*\(fetch\)$/ {print $2}' | awk -F'/' '{print $2}' | awk -F'.' '{print $1}')

Server="<b>Server</b>:Development"

MSG="${L}%0A<b>PROJECT</b>: PMS Project %0A<b>APPLICATION</b>: Web %0A<b>STATUS</b>: Failed%0A<b>VERSION</b>: ${BUILD_NUMBER}%0A${L}%0A${Log}%0A${L}%0A${Server}%0A${L}"

if [ -z "${Log}" ];then
    echo "String is Empty"
    else
    curl -s -X POST https://api.telegram.org/bot${BOT_TOKEN}/sendMessage -d chat_id=${CHAT_ID} -d text="${MSG}" -d parse_mode="HTML"
fi
