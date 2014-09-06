
/*
  * * Populate DB with sample data on server start
  * * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

(function() {
  'use strict';
  var Dish, Eatery, Q, User, config, mongoose;

  process.env.NODE_ENV = process.env.NODE_ENV || 'development';

  User = require('../api/user/user.model');

  Eatery = require('../api/eatery/eatery.model');

  Dish = require('../api/dish/dish.model');

  Q = mongoose = require('mongoose');

  config = require('../config/environment');

  mongoose.connect(config.mongo.uri, config.mongo.options);

  Dish.removeQ().then(function() {
    return Eatery.removeQ();
  }).then(function() {
    var constructEatery, index, _i, _results;
    constructEatery = function(name, info, background) {
      return {
        name: name,
        info: info,
        background: background
      };
    };
    _results = [];
    for (index = _i = 1; _i <= 10; index = ++_i) {
      _results.push(Eatery.createQ(constructEatery("young的私房菜" + index, "young的私房菜" + index)));
    }
    return _results;
  }).then(function(results) {
    return Q.all(results);
  }).then(function(results) {
    var item, _i, _len, _results;
    console.dir(results[0]);
    _results = [];
    for (_i = 0, _len = results.length; _i < _len; _i++) {
      item = results[_i];
      _results.push(Dish.createQ({
        name: "红烧肉" + item._id,
        info: "红烧肉" + item._id
      }));
    }
    return _results;
  }).then(function() {
    return User.removeQ();
  }).then(function() {
    return User.create({
      provider: 'local',
      name: 'Test User',
      email: 'test@test.com',
      password: 'test'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@admin.com',
      password: 'admin'
    }, function() {
      return console.log('finished populating users');
    });
  });

}).call(this);

//# sourceMappingURL=seed.js.map
