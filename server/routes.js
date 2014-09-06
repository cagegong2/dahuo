(function() {
  'use strict';
  var errorHandler, errors;

  errors = require('./components/errors');

  errorHandler = function(err, req, res, next) {
    console.dir(next);
    return res.json(err.status || 500, err);
  };

  module.exports = function(app) {
    app.use('/api/eateries', require('./api/eatery'));
    app.use('/api/dishes', require('./api/dish'));
    app.use('/api/users', require('./api/user'));
    app.use('/auth', require('./auth'));
    app.use(errorHandler);
    app.route('/:url(api|auth|components|app|bower_components|assets)/*').get(errors[404]);
    return app.route('/*').get(function(req, res) {
      return res.sendfile(app.get('appPath') + '/index.html');
    });
  };

}).call(this);

//# sourceMappingURL=routes.js.map
