const express = require('express');
const apiRouter = express.Router();

module.exports = function(passport) {
  const courseRoutes = require('./course.routes')(apiRouter, passport);
  const authRoutes = require('./auth.routes')(apiRouter, passport);
  const userRoutes = require('./user.routes')(apiRouter, passport);
  const requestRoutes = require('./request.routes')(apiRouter, passport);
  return apiRouter;
};

// Exports
