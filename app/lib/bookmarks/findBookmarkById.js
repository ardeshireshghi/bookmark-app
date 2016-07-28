var Bookmark = require('app/models/bookmark');

module.exports = function(docId) {
  return Bookmark.findById(docId);
};
