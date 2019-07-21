#!/bin/bash
. ~/.nvm/nvm.sh
cd ~/apps/sm-api
git pull origin master
nvm use
npm install
npm run build
pm2 restart sm-api
