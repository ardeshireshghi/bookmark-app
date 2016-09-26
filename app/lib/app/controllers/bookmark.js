'use strict';

const bunyan = require('bunyan');
const config = require('config');
const log = bunyan.createLogger({
  name: 'controllers/bookmark.js',
  level: config.loglevel
});

const router = require('express').Router();
const noCache = require('middlewares/no_cache');
const bookmark = require('./bookmark/index');
const ResponseFormatter = require('response/formatter');
const bookmarkRepository = require('bookmarks');
const buildSearchQuery = require('search/query_builder');
const sortByRelevancy = require('search/sort_by_relevancy');

router.use(noCache);

router.get('/bookmarks', bookmark.getAll);
router.get('/bookmark/:id', bookmark.get);
router.post('/bookmark', bookmark.post);

// Search route
router.get('/search', (req, res, next) => {
  const keyword = req.query.q;

  // When keyword is empty
  if (!keyword) {
    return bookmark.getAll(req, res, next);
  }

  log.info('Searching: ', keyword);

  // Otherwise...
  bookmarkRepository.searchBookmarks(buildSearchQuery(keyword))
  .then((data) => {
    const responseFormatter = ResponseFormatter(res);
    const MAX_PAGE_SIZE = config.searchMaxPageSize;
    const sortedData = sortByRelevancy(keyword, data, MAX_PAGE_SIZE);

    responseFormatter(sortedData);
    next();
  })
  .catch((err) => {
    log.error(err);
  });
});

log.info('Added GET /search route...');
log.info('Added GET /bookmarks route...');
log.info('Added GET /bookmark route...');
log.info('Added POST /bookmark route...');

module.exports = router;
