const conf = {
  type    : 'mongo',
  db      : process.env.MONGO_DB || 'test',
  host    : process.env.MONGO_HOST || 'localhost',
  port    : process.env.MONGO_PORT || 27017,
  host2   : process.env.MONGO_HOST2 || 'localhost',
  port2   : process.env.MONGO_PORT || 27017,
  username: process.env.MONGO_USER || 'root',
  password: process.env.MONGO_PASS || '',
  mode    : process.env.MONGO_MODE || '',
  setName : process.env.MONGO_SET_NAME || ''
};

module.exports = conf;
