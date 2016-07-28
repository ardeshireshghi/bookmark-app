var cfg = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 8000,
  database: {
    host: process.env.DB_HOST || 'localhost',
    name: process.env.DB_NAME || 'bookmarks'
  },
  loglevel: 'info'
};

module.exports = cfg;
