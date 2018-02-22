const request = require('request');
const fs = require('fs');

module.exports = {
  download(src, dest, extra = {}) {
    return new Promise((resolve, reject) => {
      request.get(src)
        .on('error', (err) => {
          reject(err);
        })
        .on('end', () => {
          extra.src = src;
          resolve(extra);
        })
        .pipe(fs.createWriteStream(dest));
    });
  }
};
