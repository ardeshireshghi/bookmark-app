var Bookmark = require('app/models/bookmark');

module.exports = function(document) {
  if (document._id || document.id) {
    throw new Error('Can not create a document with existing id');
  }

  var bookmark = new Bookmark(document);
  return bookmark.save();
};
