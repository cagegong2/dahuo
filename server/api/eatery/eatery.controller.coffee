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
  , next

# Get a single eatery
exports.show = (req, res, next) ->
  Eatery.findByIdQ req.params.id
  .then (eatery)->
    eatery.populateQ 'postBy', '_id name avatar'
  .then (eatery)->
    eatery.populateQ 'dishes'
  .then (eatery) ->
    console.dir eatery
    res.json(eatery)
  , next

# Creates a new eatery in the DB.
exports.create = (req, res, next) ->
  Eatery.createQ req.body
  .then (eatery) ->
    res.json(201, eatery)
  , next


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
  , next

# Deletes a eatery from the DB.
exports.destroy = (req, res, next) ->
  Eatery.findByIdQ req.params.id
  .then (eatery) ->
    eatery.removeQ()
  , next
  .then () ->
    res.send(204)
  , next

