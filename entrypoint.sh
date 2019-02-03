#!/bin/bash

bash ./docker/dev.env.sh 
npm i -g yarn --registry=https://registry.npm.taobao.org
yarn config set registry http://registry.npm.taobao.org/
yarn

node src/index.js -s zhihu
