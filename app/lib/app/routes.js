var bunyan = require('bunyan');
var log = bunyan.createLogger({
  name: 'routes.js',
  level: require ('config').loglevel
});

var router = require('express').Router();
var bookmarkRepository = require('bookmarks');

// Adding bookmark related REST routes
router.use('/api', require('./controllers/bookmark'));

router.get('/new', function(req, res, next) {
  res.render('create');
});

router.get('/', function(req, res, next) {
  bookmarkRepository.findAllBookmarks()
  .then(function(bookmarks) {
    res.render('home', {
      bookmarks: bookmarks
    });
  })
  .catch(function(err) {
    next(err);
  })
});
// Adding App status route
router.get('/status', require('./controllers/status'));
log.info('Added app status route...');

module.exports = router;
