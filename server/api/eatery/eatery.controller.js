(function() {
  'use strict';
  var Eatery, _;

  _ = require('lodash');

  Eatery = require('./eatery.model');

  exports.index = function(req, res, next) {
    return Eatery.find().populate('postBy', '_id name avatar').execQ().then(function(eaterys) {
      return res.json(200, eaterys);
    }, function(err) {
      return next(err);
    });
  };

  exports.show = function(req, res, next) {
    return Eatery.findByIdQ(req.params.id).then(function(eatery) {
      return eatery.populateQ('dishes', '_id name info');
    }).then(function(eatery) {
      return eatery.populateQ('postBy', '_id profile');
    }).then(function(eatery) {
      return res.json(eatery);
    }, function(err) {
      return next(err);
    });
  };

  exports.create = function(req, res, next) {
    return Eatery.createQ(req.body).then(function(eatery) {
      return res.json(201, eatery);
    }, function(err) {
      return next(err);
    });
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
    }, function(err) {
      return next(err);
    });
  };

  exports.destroy = function(req, res, next) {
    return Eatery.findByIdQ(req.params.id).then(function(eatery) {
      return eatery.removeQ();
    }, function(err) {
      return next(err);
    }).then(function() {
      return res.send(204);
    }, function(err) {
      return next(err);
    });
  };

}).call(this);

//# sourceMappingURL=eatery.controller.js.map
