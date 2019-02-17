const Redis = require("ioredis");
const conf = require("../config/redis");

class RedisHelper {
  constructor(opts) {
    this.db = new Redis(opts.conf);
  }
  async get(k) {
    return await this.db.get(k);
  }
  set(k, v, expire) {
    if (!expire) {
      return this.db.set(k, v);
    } else {
      return this.db.set(k, v, "EX", expire * 1000);
    }
  }
  del(k) {
    return this.db.del(k);
  }
  async keys(k) {
    return await this.db.keys(k);
  }
}
module.exports = new RedisHelper({ conf });
module.exports.ins = new Redis(conf);
module.exports.RedisHelper = RedisHelper;
