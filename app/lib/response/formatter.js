module.exports = function(res) {
  return function formatResponse(data) {
    res.set('content-type', 'application/json');
    res.set('access-control-allow-origin', '*');
    res.end(JSON.stringify(data));
  }
};
