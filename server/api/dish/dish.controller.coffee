'use strict'

_ = require('lodash')
Dish = require('./dish.model')

# Get list of dishs
exports.index = (req, res, next) ->
  Dish.findQ().then (dishs) ->
    res.json(200, dishs)
  , (err)->
    next err

# Get a single dish
exports.show = (req, res, next) ->
  Dish.findByIdQ req.params.id
  .then (dish) ->
    res.json(dish)
  , (err)->
    next err

# Creates a new dish in the DB.
exports.create = (req, res, next) ->
  Dish.createQ req.body
  .then (dish) ->
    res.json(201, dish)
  , (err)->
    next err


# Updates an existing dish in the DB.
exports.update = (req, res, next) ->
  delete req.body._id if req.body._id
  Dish.findByIdQ req.params.id
  .then (dish) ->
    updated = _.merge dish, req.body
    updated.saveQ().then () ->
      res.json(200, dish)
    , (err)->
      next err
  , (err)->
    next err

# Deletes a dish from the DB.
exports.destroy = (req, res, next) ->
  Dish.findByIdQ req.params.id
  .then (dish) ->
    dish.removeQ()
  , (err)->
    next err
  .then () ->
    res.send(204)
  , (err)->
    next err

