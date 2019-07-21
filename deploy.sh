#!/bin/bash
cd ~/apps/sm-api
git pull origin master
nvm use
npm install
pm2 restart sm-api
