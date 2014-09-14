(function() {
  'use strict';
  var Eatery, _;

  _ = require('lodash');

  Eatery = require('./eatery.model');

  exports.index = function(req, res, next) {
    return Eatery.find().populate('postBy', '_id name avatar').execQ().then(function(eaterys) {
      return res.json(200, eaterys);
    }, next);
  };

  exports.show = function(req, res, next) {
    return Eatery.findByIdQ(req.params.id).then(function(eatery) {
      return eatery.populateQ('postBy', '_id name avatar');
    }).then(function(eatery) {
      return eatery.populateQ('dishes');
    }).then(function(eatery) {
      console.dir(eatery);
      return res.json(eatery);
    }, next);
  };

  exports.create = function(req, res, next) {
    return Eatery.createQ(req.body).then(function(eatery) {
      return res.json(201, eatery);
    }, next);
  };

  exports.update = function(req, res, next) {
    if (req.body._id) {
      delete req.body._id;
    }
    return Eatery.findByIdQ(req.params.id).then(function(eatery) {
      var updated;
      updated = _.merge(eatery, req.body);
      return updated.saveQ().then(function() {
        return res.json(200, eatery);
      }, function(err) {
        return next(err);
      });
    }, next);
  };

  exports.destroy = function(req, res, next) {
    return Eatery.findByIdQ(req.params.id).then(function(eatery) {
      return eatery.removeQ();
    }, next).then(function() {
      return res.send(204);
    }, next);
  };

}).call(this);

//# sourceMappingURL=eatery.controller.js.map
