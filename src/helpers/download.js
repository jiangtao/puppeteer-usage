const request = require('request')
const fs = require('fs')

module.exports = async function download(src, dest, extra = {}) {
  return await new Promise((resolve, reject) => {
    request.get(src)
      .on('error', err => {
        reject(err)
      })
      .on('end', data => {
        extra.src = src
        resolve(extra)
      })
      .pipe(fs.createWriteStream(dest))
  })
}
