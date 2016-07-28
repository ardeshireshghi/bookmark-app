'use strict';
var bunyan = require('bunyan');
var log = bunyan.createLogger({
  name: 'app/index.js',
  level: require ('config').loglevel
});

global.APP_STATUS = 'PENDING';

var cfg = require('config'),
  app   = require('app'),
  db    =  require('db'),
  port  = cfg.port;

db.initialise(cfg.database, function(err) {
  if (err) {
    log.error('There was a problem connecting to the Database');
    global.APP_STATUS = 'ERROR';
    return;
  }

  global.APP_STATUS = 'ACTIVE';
  log.info('Connected to the database "%s"', cfg.database.name);
});

app.listen(cfg.port);
log.info('Bookmark App listening on port', cfg.port);
