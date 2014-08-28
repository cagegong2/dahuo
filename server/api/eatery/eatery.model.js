(function() {
  'use strict';
  var EaterySchema, Schema, mongoose;

  mongoose = require('mongoose-q')();

  Schema = mongoose.Schema;

  EaterySchema = new Schema({
    name: String,
    info: String,
    active: Boolean
  });

  module.exports = mongoose.model('Eatery', EaterySchema);

}).call(this);

//# sourceMappingURL=eatery.model.js.map
