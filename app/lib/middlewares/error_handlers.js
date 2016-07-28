var bunyan = require('bunyan');
var log = bunyan.createLogger({
  name: 'bookmark_app',
  level: require ('config').loglevel
});

function logErrors(err, req, res, next) {
  log.error(err.stack);
  next(err);
}

function clientErrorHandler(err, req, res, next) {
  if (err && req.xhr) {
    res.status(500).json({
      error: true,
      code: 1000,
      message: 'Interal Error',
      description: err.message
    });
  } else {
    next(err);
  }
}

module.exports = {
  logErrors: logErrors,
  clientErrorResponder: clientErrorHandler
};
