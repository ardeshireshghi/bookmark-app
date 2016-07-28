var express = require('express');
var exphbs  = require('express-handlebars');

var cfg = require('config');
var app = express();
var bodyParser = require('body-parser');
var errorHandlers = require('middlewares/error_handlers');

var hbs = exphbs.create({
  layoutsDir: __dirname + '/views'
});

// Set middlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

// Check App status
app.use(function(req, res, next) {
  if (global.APP_STATUS !== 'ACTIVE') {
    res.set('access-control-allow-origin', '*');
    res.status(500).end('Application status is: ' + global.APP_STATUS);
    return;
  }
  next();
});

// Set view engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');
app.enable('view cache');

// Set the router
app.use(require('./routes.js'));
app.use(errorHandlers.logErrors);
app.use(errorHandlers.clientErrorResponder);

// TODO: Set after routes middlewares (Error handlers)
module.exports = app;
