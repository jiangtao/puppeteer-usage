const mongoose = require('mongoose');
const es6Promise = require('es6-promise');
const conf = require('../config/mongo');

function getMongoUri(config) {
  let namePart = '';
  let hostPart;
  let setPostFix = '';
  if (config.username && config.password) {
    namePart = `${config.username}:${config.password}@`;
  }
  hostPart = `${config.host}:${config.port}`;
  if (config.mode === 'set') {
    hostPart += `,${config.host2}:${config.port2}`;
    setPostFix = `?replicaSet=${config.setName}`;
  }

  let authSource = '';
  if (config.authdb) {
    authSource = `?authSource=${config.authdb}`;
  }
  return `mongodb://${namePart}${hostPart}/${config.db}${authSource}${setPostFix}`;
}
mongoose.Promise = es6Promise.Promise;
mongoose.connection = mongoose.createConnection(getMongoUri(conf));
mongoose.connection.on('error', res => console.log(res));

module.exports = getMongoUri;
module.exports.Promise = es6Promise.Promise;
