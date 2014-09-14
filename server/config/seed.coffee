###
 # * Populate DB with sample data on server start
 # * to disable, edit config/environment/index.js, and set `seedDB: false`
###

'use strict'
process.env.NODE_ENV = process.env.NODE_ENV or 'development'

User = require '../api/user/user.model'
Eatery = require '../api/eatery/eatery.model'
Dish = require '../api/dish/dish.model'
_s = require 'underscore.string'
mongoose = require 'mongoose'

config = require '../config/environment'


userId       = '1111111111111111111111%02d'
eateryId     = '2222222222222222222222%02d'
dishId       = '3333333333333333333333%02d'

# Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options)

Dish.removeQ()
.then ()->
  Eatery.removeQ()
.then ()->
  constructEatery = (index)->
    _id: _s.sprintf eateryId, index
    name: "young的私房菜#{index}"
    info: "young的私房菜#{index}"
    postBy: _s.sprintf userId, 2 + index%2
    background: "http://lorempixel.com/640/640/food/#{index}"
    dishes: _s.sprintf(dishId ,i + index * 5) for i in [1..5]
  Eatery.createQ(constructEatery(index)) for index in [1..10]
.then (results)->
  console.log 'finish eateries'
  constructDish = (index)->
    _id: _s.sprintf dishId, index
    name: ["红烧肉","清蒸鱼","狮子头"][index % 3]
    info: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
    image: "http://lorempixel.com/320/320/food/#{index%10}"
  Dish.createQ(constructDish(index)) for index in [1..50]
.then (results)->
  console.log 'finish dishes'
  User.removeQ()
.then ()->
  User.create
    _id: _s.sprintf userId, 1
    avatar: "http://lorempixel.com/128/128/people/2"
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  ,
    _id: _s.sprintf userId, 0
    avatar: "http://lorempixel.com/128/128/people/1"
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  ,
    _id: _s.sprintf userId, 2
    avatar: "http://lorempixel.com/128/128/people/3"
    provider: 'local',
    name: '凯奇',
    email: 'cage@cage.com',
    password: 'cage'
  ,
    _id: _s.sprintf userId, 3
    avatar: "http://lorempixel.com/128/128/people/4"
    provider: 'local',
    name: '天阳',
    email: 'young@young.com',
    password: 'young'
  , () ->
      console.log('finished populating users')
