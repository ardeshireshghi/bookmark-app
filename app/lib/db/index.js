var mongoose = require('mongoose');

function initialise(dbConfig, callback) {
  mongoose.connect('mongodb://' + dbConfig.host + '/' + dbConfig.name);
  mongoose.Promise = require('bluebird');

  var db = mongoose.connection;
  db.on('error', function(){
    callback(new Error('Error connecting to the database'));
  });

  db.once('open', function() {
    callback(null);
  });
}

module.exports = {
  initialise: initialise
};
