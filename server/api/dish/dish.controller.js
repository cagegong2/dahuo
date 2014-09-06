(function() {
  'use strict';
  var Dish, _;

  _ = require('lodash');

  Dish = require('./dish.model');

  exports.index = function(req, res, next) {
    return Dish.findQ().then(function(dishs) {
      return res.json(200, dishs);
    }, function(err) {
      return next(err);
    });
  };

  exports.show = function(req, res, next) {
    return Dish.findByIdQ(req.params.id).then(function(dish) {
      return res.json(dish);
    }, function(err) {
      return next(err);
    });
  };

  exports.create = function(req, res, next) {
    return Dish.createQ(req.body).then(function(dish) {
      return res.json(201, dish);
    }, function(err) {
      return next(err);
    });
  };

  exports.update = function(req, res, next) {
    if (req.body._id) {
      delete req.body._id;
    }
    return Dish.findByIdQ(req.params.id).then(function(dish) {
      var updated;
      updated = _.merge(dish, req.body);
      return updated.saveQ().then(function() {
        return res.json(200, dish);
      }, function(err) {
        return next(err);
      });
    }, function(err) {
      return next(err);
    });
  };

  exports.destroy = function(req, res, next) {
    return Dish.findByIdQ(req.params.id).then(function(dish) {
      return dish.removeQ();
    }, function(err) {
      return next(err);
    }).then(function() {
      return res.send(204);
    }, function(err) {
      return next(err);
    });
  };

}).call(this);

//# sourceMappingURL=dish.controller.js.map
