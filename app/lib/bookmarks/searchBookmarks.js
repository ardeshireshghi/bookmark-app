var Bookmark = require('app/models/bookmark');

module.exports = function(searchQuery) {
  return Bookmark.find(searchQuery);
};
