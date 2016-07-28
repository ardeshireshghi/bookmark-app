'use strict';
var bunyan = require('bunyan');
var log = bunyan.createLogger({
  name: 'controllers/bookmark.js',
  level: require ('config').loglevel
});

var router = require('express').Router();
var noCache = require('middlewares/no_cache');
var bookmark = require('./bookmark/index');

router.use(noCache);

router.get('/bookmarks', bookmark.getAll);
router.get('/bookmark/:id', bookmark.get);
router.post('/bookmark', bookmark.post);
log.info('Added GET /bookmarks route...');
log.info('Added GET /bookmark route...');
log.info('Added POST /bookmark route...');

module.exports = router;
