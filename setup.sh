#!/usr/bin/env bash

npm run build:ssr &&
cp -r dist ../ &&
pm2 restart server
