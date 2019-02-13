let config = {
  development: {
    port: 6379, // Redis port
    host: "127.0.0.1", // Redis host
    family: 4, // 4 (IPv4) or 6 (IPv6)
    password: "",
    db: 15
  },
  production: {
    port: process.env.REDIS_PORT || 6379,
    host: process.env.REDIS_HOST || "127.0.0.1",
    family: 4,
    password: process.env.REDIS_PASS || "",
    db: process.env.REDIS_DB || 15
  }
};

module.exports = config[process.env.NODE_ENV || "development"];
