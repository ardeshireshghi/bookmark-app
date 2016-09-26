var cfg = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 8000,
  database: {
    host: process.env.DB_HOST || 'localhost',
    name: process.env.DB_NAME || 'bookmarks',
    user: process.env.DB_USER,
    password: process.env.DB_PASS
  },
  loglevel: 'info',
  searchMaxPageSize: 200
};

module.exports = cfg;
