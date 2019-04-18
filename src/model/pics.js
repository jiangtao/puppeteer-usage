const mongoose = require('mongoose');
const { add, update } = require('./hooks/common');

const PicsSchema = mongoose.Schema({
  removed    : {
    type: Number,
    default: 0
  }, // 删除时间戳
  create_time: {
    type   : Number,
    default: 0
  },
  update_time: {
    type   : Number,
    default: 0
  },
  url        : String,
  ip         : String,
  pic_url    : String,
  meta: Object
});

const Pics = mongoose.model('pics', PicsSchema);
PicsSchema.index({
  pic_url: 1,
  url    : 1
}, { unique: true });
add(PicsSchema);
update(PicsSchema);
module.exports = Pics;
