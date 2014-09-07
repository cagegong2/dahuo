'use strict'

mongoose = require('mongoose-q')()
Schema = mongoose.Schema

DishSchema = new Schema
  name: String
  info: String

module.exports = mongoose.model('Dish', DishSchema)
