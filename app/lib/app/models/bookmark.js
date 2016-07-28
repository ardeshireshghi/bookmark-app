var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookmarkSchema = new Schema({
  title: String,
  href: String,
  description: {type: String, default: ''},
  tags: { type: [String], index: true },
  private: {type: Boolean, default: false},
  date: { type: Date, default: Date.now }
});

var Bookmark = mongoose.model('Bookmark', bookmarkSchema);

module.exports = Bookmark;
