const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const config = require('../configs/config');

let register = function(req, res) {
  if (!req.body || !req.body.password || !req.body.email) {
    res.json({
      success: false,
      message: 'Please enter an email and password to register.'
    });
  } else {
    let newUser = new User(req.body);

    newUser
      .save()
      .then(savedUser => {
        res.json({
          success: true,
          message: `${savedUser} successfuly registered.`
        });
      })
      .catch(err => {
        let errMessage = err.code === 11000 ?
          'The email address already exists.' :
          `There is some error. _ErrCode: ${err}`;
        res.json({
          success: false,
          message: errMessage
        });
      });
  }
};

let authenticate = function(req, res) {
  console.log(req.body.email);
  User
    .findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        res.json({
          success: false,
          message: 'User not found.'
        });
      } else {
        let password = req.body.password;
        user
          .comparePassword(password)
          .then(isMatch => {
            if (isMatch) {
              let userInfo = {
                user: user.getUserInfo()
              };
              let token = jwt.sign(userInfo, config.token.secret, config.token.options);
              res.json({
                success: true,
                token: `JWT ${token}`
              });
            } else {
              res.json({
                success: false,
                message: 'Authenticatoin failed Wrong Password'
              });
            }
          })
          .catch(e => {
            res.json({
              success: false,
              message: `Authenticatoin failed with: ${e}`
            });
          });
      }
    })
    .catch(e => {
      throw e;
    });
};

let deleteUser = function(req, res) {
  let query = { _id: req.params.id };

  User
    .remove(query)
    .then(() => {
      res.json({
        success: true,
        message: 200
      });
    })
    .catch(e => {
      res.json({
        success: false,
        message: e
      });
    });
};

module.exports = {
  register,
  authenticate,
  deleteUser
};
