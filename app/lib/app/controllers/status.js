module.exports = function(req, res, next) {
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(JSON.stringify({
    service: 'bookmarks-api',
    author: 'Ardeshir Eshghi',
    company:'eArdi',
    status: global.APP_STATUS
  }));
};
