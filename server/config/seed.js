
/*
  * * Populate DB with sample data on server start
  * * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

(function() {
  'use strict';
  var Dish, Eatery, User, config, dishId, eateryId, mongoose, userId, _s;

  process.env.NODE_ENV = process.env.NODE_ENV || 'development';

  User = require('../api/user/user.model');

  Eatery = require('../api/eatery/eatery.model');

  Dish = require('../api/dish/dish.model');

  _s = require('underscore.string');

  mongoose = require('mongoose');

  config = require('../config/environment');

  userId = '1111111111111111111111%02d';

  eateryId = '2222222222222222222222%02d';

  dishId = '3333333333333333333333%02d';

  mongoose.connect(config.mongo.uri, config.mongo.options);

  Dish.removeQ().then(function() {
    return Eatery.removeQ();
  }).then(function() {
    var constructEatery, index, _i, _results;
    constructEatery = function(index) {
      var i;
      return {
        _id: _s.sprintf(eateryId, index),
        name: "young的私房菜" + index,
        info: "young的私房菜" + index,
        postBy: _s.sprintf(userId, 2 + index % 2),
        background: "http://lorempixel.com/640/640/food/" + index,
        dishes: (function() {
          var _i, _results;
          _results = [];
          for (i = _i = 1; _i <= 5; i = ++_i) {
            _results.push(_s.sprintf(dishId, i + index * 5));
          }
          return _results;
        })()
      };
    };
    _results = [];
    for (index = _i = 1; _i <= 10; index = ++_i) {
      _results.push(Eatery.createQ(constructEatery(index)));
    }
    return _results;
  }).then(function(results) {
    var constructDish, index, _i, _results;
    console.log('finish eateries');
    constructDish = function(index) {
      return {
        _id: _s.sprintf(dishId, index),
        name: ["红烧肉", "清蒸鱼", "狮子头"][index % 3],
        info: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
      };
    };
    _results = [];
    for (index = _i = 1; _i <= 50; index = ++_i) {
      _results.push(Dish.createQ(constructDish(index)));
    }
    return _results;
  }).then(function(results) {
    console.log('finish dishes');
    return User.removeQ();
  }).then(function() {
    return User.create({
      _id: _s.sprintf(userId, 1),
      avatar: "http://lorempixel.com/128/128/people/2",
      provider: 'local',
      name: 'Test User',
      email: 'test@test.com',
      password: 'test'
    }, {
      _id: _s.sprintf(userId, 0),
      avatar: "http://lorempixel.com/128/128/people/1",
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@admin.com',
      password: 'admin'
    }, {
      _id: _s.sprintf(userId, 2),
      avatar: "http://lorempixel.com/128/128/people/3",
      provider: 'local',
      name: '凯奇',
      email: 'cage@cage.com',
      password: 'cage'
    }, {
      _id: _s.sprintf(userId, 3),
      avatar: "http://lorempixel.com/128/128/people/4",
      provider: 'local',
      name: '天阳',
      email: 'young@young.com',
      password: 'young'
    }, function() {
      return console.log('finished populating users');
    });
  });

}).call(this);

//# sourceMappingURL=seed.js.map
