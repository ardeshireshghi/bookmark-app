var ResponseFormatter = require('response/formatter');
var bookmarkRepository = require('bookmarks');

function getBookmark(req, res, next) {
  console.log(req.params);
  var bookmarkId = req.params.id;

  bookmarkRepository.findBookmarkById(bookmarkId)
  .then(function(data) {
    var responseFormatter = ResponseFormatter(res);
    responseFormatter(data);
    return next(null);
  })
  .catch(function(err) {
    next(err);
  });
}

function getBookmarks(req, res, next) {
  bookmarkRepository.findAllBookmarks()
  .then(function(data) {
    var responseFormatter = ResponseFormatter(res);
    responseFormatter(data);
    return next(null);
  })
  .catch(function(err) {
    next(err);
  });
}

function postBookmark(req, res, next) {
  bookmarkRepository.insertBookmark(req.body)
  .then(function(data) {
    var responseFormatter = ResponseFormatter(res);
    responseFormatter(data);
    return next(null);
  })
  .catch(function(err) {
    next(err);
  });
}

module.exports = {
  get: getBookmark,
  post: postBookmark,
  getAll: getBookmarks
};
