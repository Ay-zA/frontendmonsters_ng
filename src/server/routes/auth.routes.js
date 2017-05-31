const User = require('../models/user.model');
const config = require('../configs/config');
const jwt = require('jsonwebtoken');
const sendgrid = require('sendgrid')('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');
const helper = require('sendgrid').mail;

var handleRegister = function(req, res, next) {
  if (!req.body || !req.body.password || !req.body.email) {
    res.json({
      success: false,
      message: 'Please enter an email and password to register.'
    });
  } else {

    let handleSaveNewUser = function(err, savedUser) {
      if (err) {
        let errMessage = err.code === 11000 ? 'The email address already exists.' : `There is some error. _ErrCode: ${err}`;
        res.json({
          success: false,
          message: errMessage
        });
      } else {
        let fromEmail = new helper.Email('noreplay@herogramer.com');
        let toEmail = new helper.Email(savedUser.email);
        let subject = 'Welcome to Herogramer';
        let content = new helper.Content('text/html', 'Welcome to herogramer, to compelete registration click on this link <a href="#">Link</a>s');
        let mail = new helper.Mail(fromEmail, subject, toEmail, content);

        let request = sendgrid.emptyRequest({
          method: 'POST',
          path: '/v3/mail/send',
          body: mail.toJSON()
        });

        sendgrid.API(request, function(error, response) {
          console.log(response.statusCode);
          console.log(response.body);
          console.log(response.headers);
        });

        res.json({
          success: true,
          message: `${savedUser} successfuly registered.`
        });
      }
    };
    let role = req.body.role || 0;
    let newUser = new User({
      name: req.body.name,
      password: req.body.password,
      email: req.body.email,
      role: role
    });

    newUser.save(handleSaveNewUser);
  }
};

var handleAuthenticate = function(req, res, next) {
  let handleFindUser = function(err, user) {
    if (err) {
      throw err;
    }
    if (!user) {
      res.json({
        success: false,
        message: 'User not found.'
      });
    } else {
      let password = req.body.password;
      user.comparePassword(password, (err, isMatch) => {
        if (!err, isMatch) {
          let userInfo = {
            user: user.getUserInfo()
          };
          let token = jwt.sign(userInfo, config.token.secret, config.token.options);
          res.json({
            success: true,
            token: `JWT ${token}`,
          });
        } else {
          res.json({
            success: false,
            message: `Authenticatoin failed ${!isMatch ? 'Wrong Password' : err}`
          });
        }
      });
    }
  };
  User.findOne({
    email: req.body.email
  }, handleFindUser);
};

let handleDeleteUser = function(req, res, next) {
  let query = {
    _id: req.params.id
  };

  let handleResponse = function(err) {
    if (err) {
      res.json({
        success: false,
        message: 500
      });
    } else {
      res.json({
        success: true,
        message: 200
      });
    }
  };

  User.remove(query, handleResponse);
};

module.exports = function(apiRouter) {
  apiRouter.post('/register', handleRegister);
  apiRouter.post('/authenticate', handleAuthenticate);
  apiRouter.delete('/auth/:id', handleDeleteUser);
};
