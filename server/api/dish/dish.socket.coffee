# Broadcast updates to client when the model changes

'use strict'

Dish = require('./dish.model')

exports.register = (socket) ->
  Dish.schema.post 'save',  (doc) ->
    onSave(socket, doc)
  Dish.schema.post 'remove',  (doc) ->
    onRemove(socket, doc)

onSave = (socket, doc, cb) ->
  socket.emit('dish:save', doc)

onRemove = (socket, doc, cb) ->
  socket.emit('dish:remove', doc)
