const Request = require('../models/request.model').model;
const config = require('../configs/config');

module.exports = function(apiRouter, passport) {
  apiRouter.route('/requests').get(passport.authenticate('jwt', config.passport), (req, res, next) => {
    let handleResponse = (err, requests) => {
      if (err) {
        console.log(err);
        res.json({
          success: false,
          err: '500'
        });
      } else {
        res.json({
          success: true,
          data: requests
        });
      }
    };

    let options = {
      sort: {
        date: -1
      }
    };

    Request.find({}, null, options,handleResponse);
  });

  apiRouter.route('/requests').post(passport.authenticate('jwt', config.passport), (req, res, next) => {
    let requestData = req.body;
    console.log(requestData);
    let request = new Request(requestData);
    console.log(request);

    let handleNewRequest = (err) => {
      if (err) {
        res.json({
          success: false,
          error: 500
        });
      } else {
        res.json({
          success: true,
          data: 200
        });
      }
    };

    request.save(handleNewRequest);
  });

  apiRouter.route('/requests/seeall').get(passport.authenticate('jwt', config.passport), (req, res, next) => {

    let handleResponse = (err) => {
      if (err) {
        res.json({
          success: false,
          error: 500
        });
      } else {
        res.json({
          success: true,
          data: 200
        });
      }
    };

    let findQuery = {
      status: 0
    };

    let updateQuery = {
      $set: {
        status: 1
      }
    };

    let options = {
      upsert: false,
      multi: true
    };

    Request.update(findQuery, updateQuery, options, handleResponse);
  });

  apiRouter.route('/requests/:id').delete(passport.authenticate('jwt', config.passport), (req, res, next) => {
    let id = req.params.id;
    let query = {
      _id: id
    };

    let handleResponse = (err) => {
      if (err) {
        res.json({
          success: false,
          error: 500
        });
      } else {
        res.json({
          success: true,
          data: 200
        });
      }
    };

    Request.remove(query, handleResponse);
  });
};
