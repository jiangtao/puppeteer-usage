const add = (schema) => {
  schema.pre('save', function saveHook(next) {
    this.create_time = Date.now();
    next();
  });
};

const update = (schema) => {
  schema.pre('update', function updateHook() {
    this.update({}, { $set: { update_time: Date.now() } });
  });
};

module.exports = {
  add,
  update
};
