(function() {
  'use strict';
  var Dish, onRemove, onSave;

  Dish = require('./dish.model');

  exports.register = function(socket) {
    Dish.schema.post('save', function(doc) {
      return onSave(socket, doc);
    });
    return Dish.schema.post('remove', function(doc) {
      return onRemove(socket, doc);
    });
  };

  onSave = function(socket, doc, cb) {
    return socket.emit('dish:save', doc);
  };

  onRemove = function(socket, doc, cb) {
    return socket.emit('dish:remove', doc);
  };

}).call(this);

//# sourceMappingURL=dish.socket.js.map
