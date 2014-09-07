'use strict'

mongoose = require('mongoose-q')()
Schema = mongoose.Schema

EaterySchema = new Schema
  name: String
  info: String
  background: String
  dishes:[
    type: Schema.Types.ObjectId
    ref: "Dish"
  ]
  postBy: {
    type: Schema.Types.ObjectId
    ref: 'User'
    required: true
  }

module.exports = mongoose.model('Eatery', EaterySchema)
