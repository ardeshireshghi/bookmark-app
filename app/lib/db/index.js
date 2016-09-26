const mongoose = require('mongoose');
const bunyan = require('bunyan');
const log = bunyan.createLogger({
  name: 'db/index.js',
  level: require('config').loglevel
});

function initialise(dbConfig, callback) {
  const connectionString = `mongodb:\/\/${dbConfig.user}:${dbConfig.password}@${dbConfig.host}/${dbConfig.name}`;
  mongoose.connect(connectionString);
  mongoose.Promise = require('bluebird');

  var db = mongoose.connection;
  db.on('error', function(err) {
     log.error(err);
     callback(new Error('Error connecting to the database'));
  });

  db.once('open', function() {
    callback(null);
  });
}

module.exports = {
  initialise: initialise
};
