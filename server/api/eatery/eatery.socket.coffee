# Broadcast updates to client when the model changes

'use strict'

Eatery = require('./eatery.model')

exports.register = (socket) ->
  Eatery.schema.post 'save',  (doc) ->
    onSave(socket, doc)
  Eatery.schema.post 'remove',  (doc) ->
    onRemove(socket, doc)

onSave = (socket, doc, cb) ->
  socket.emit('eatery:save', doc)

onRemove = (socket, doc, cb) ->
  socket.emit('eatery:remove', doc)
