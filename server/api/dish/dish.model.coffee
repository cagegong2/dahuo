'use strict'

mongoose = require('mongoose-q')()
Schema = mongoose.Schema

DishSchema = new Schema
  name: String
  info: String
  image: String

module.exports = mongoose.model('Dish', DishSchema)
