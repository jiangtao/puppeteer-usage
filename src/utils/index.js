const faker = require('./faker')
const time = require('./time')

module.exports = {
  sleep(n) {
    return new Promise((resolve,reject) => {
      setTimeout(resolve,n * 1000)
    })
  },
  faker: faker,
  time: time
}
