(function() {
  'use strict';
  var Eatery, onRemove, onSave;

  Eatery = require('./eatery.model');

  exports.register = function(socket) {
    Eatery.schema.post('save', function(doc) {
      return onSave(socket, doc);
    });
    return Eatery.schema.post('remove', function(doc) {
      return onRemove(socket, doc);
    });
  };

  onSave = function(socket, doc, cb) {
    return socket.emit('eatery:save', doc);
  };

  onRemove = function(socket, doc, cb) {
    return socket.emit('eatery:remove', doc);
  };

}).call(this);

//# sourceMappingURL=eatery.socket.js.map
