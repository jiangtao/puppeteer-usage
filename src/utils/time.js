const moment = require('moment');

module.exports = {
  get date() {
    return moment().format('YYYYMMDD');
  },
  get second() {
    return moment().format('YYYYMMDDHHmmSS');
  },
  get special() {
    return moment().format('YYYY-MM-DD-HH_mm_SS');
  }
};
