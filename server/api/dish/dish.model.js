(function() {
  'use strict';
  var DishSchema, Schema, mongoose;

  mongoose = require('mongoose-q')();

  Schema = mongoose.Schema;

  DishSchema = new Schema({
    name: String,
    info: String,
    active: Boolean
  });

  module.exports = mongoose.model('Dish', DishSchema);

}).call(this);

//# sourceMappingURL=dish.model.js.map
