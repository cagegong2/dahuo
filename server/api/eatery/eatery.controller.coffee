'use strict'

_ = require('lodash')
Eatery = require('./eatery.model')

# Get list of eaterys
exports.index = (req, res, next) ->
  Eatery.find()
  .populate 'postBy', '_id name avatar'
  .execQ()
  .then (eaterys) ->
    res.json(200, eaterys)
  , (err)->
    next err

# Get a single eatery
exports.show = (req, res, next) ->
  Eatery.findByIdQ req.params.id
  .then (eatery) ->
    eatery.populateQ 'dishes', '_id name info'
  .then (eatery) ->
    eatery.populateQ 'postBy', '_id profile'
  .then (eatery) ->
    res.json(eatery)
  , (err)->
    next err

# Creates a new eatery in the DB.
exports.create = (req, res, next) ->
  Eatery.createQ req.body
  .then (eatery) ->
    res.json(201, eatery)
  , (err)->
    next err


# Updates an existing eatery in the DB.
exports.update = (req, res, next) ->
  delete req.body._id if req.body._id
  Eatery.findByIdQ req.params.id
  .then (eatery) ->
    updated = _.merge eatery, req.body
    updated.saveQ().then () ->
      res.json(200, eatery)
    , (err)->
      next err
  , (err)->
    next err

# Deletes a eatery from the DB.
exports.destroy = (req, res, next) ->
  Eatery.findByIdQ req.params.id
  .then (eatery) ->
    eatery.removeQ()
  , (err)->
    next err
  .then () ->
    res.send(204)
  , (err)->
    next err

