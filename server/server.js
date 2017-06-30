const bodyParser = require('body-parser');
const express = require('express');
const favicon = require('serve-favicon');
const morgan = require('morgan');
const passport = require('passport');
const config = require('./configs/config');
require('./db/mongoose');

// Init
const app = express();
const isDevMode = config.server.env === 'dev';

app.disable('x-powered-by');
if (isDevMode) {
  console.warn('Dev Mode');
}

// Middlewares
app.use(favicon(config.pathes.favIcon));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(passport.initialize());
config.initJWTPassport(passport);

// Statics
app.use(express.static(config.pathes.assets));

// Routes
const apiRouter = require('./routes/api.routes')(passport);

app.use('/api', apiRouter);

// Requests
app.get('/*', function(req, res) {
  res.sendFile(config.pathes.index);
});

// 404 Not Found
app.use(function(req, res, next) {
  const err = new Error('Not Found');

  next(err);
});

// Error!
app.use(function(err, req, res) {
  res.status(err.status || 500);
  res.json({
    error: {},
    message: err.message
  });
});

// Exports
module.exports = app;
