var Bookmark = require('app/models/bookmark');

module.exports = function() {
  return Bookmark.find({}).sort([['date', 'descending']]);
};
