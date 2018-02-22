const faker = require('./faker');
const time = require('./time');
const request = require('./request');

module.exports = {
  sleep(n) {
    return new Promise((resolve) => {
      setTimeout(resolve, n * 1000);
    });
  },
  faker,
  time,
  request
};
