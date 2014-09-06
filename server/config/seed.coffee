###
 # * Populate DB with sample data on server start
 # * to disable, edit config/environment/index.js, and set `seedDB: false`
###

'use strict'
process.env.NODE_ENV = process.env.NODE_ENV or 'development'

User = require('../api/user/user.model')
Eatery = require('../api/eatery/eatery.model')
Dish = require('../api/dish/dish.model')
Q =

mongoose = require('mongoose')

config = require('../config/environment')

# Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options)

Dish.removeQ()
.then ()->
  Eatery.removeQ()
.then ()->
  constructEatery = (name, info, background)->
    name: name
    info: info
    background: background
  Eatery.createQ(constructEatery("young的私房菜#{index}","young的私房菜#{index}")) for index in [1..10]
.then (results)->
  Q.all(results)
.then (results)->
  # no _id ?
  console.dir results[0]
  Dish.createQ {name: "红烧肉#{item._id}", info: "红烧肉#{item._id}"} for item in results
.then ()->
  User.removeQ()
.then ()->
  User.create
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  ,
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  , () ->
      console.log('finished populating users')
