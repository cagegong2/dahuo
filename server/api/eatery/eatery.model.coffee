'use strict'

mongoose = require('mongoose-q')()
Schema = mongoose.Schema

EaterySchema = new Schema
  name: String
  info: String
  active: Boolean

module.exports = mongoose.model('Eatery', EaterySchema)
