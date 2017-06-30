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
const apiRouter = require('./routes/api.routes');

app.use('/api', apiRouter);

// Requests
app.get('/*', function(req, res) {
  res.sendFile(config.pathes.index);
});

// Not Found
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/* eslint-disable no-unused-vars, no-param-reassign */
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.send('500');
});

// Exports
module.exports = app;
