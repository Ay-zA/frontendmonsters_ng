const User = require('../models/user.model');
const config = require('../configs/config');
const jwt = require('jsonwebtoken');

let handleRegister = function(req, res) {
  if (!req.body || !req.body.password || !req.body.email) {
    res.json({success: false, message: 'Please enter an email and password to register.'});
  } else {
    let handleSaveNewUser = function(err, savedUser) {
      if (err) {
        let errMessage = err.code === 11000
          ? 'The email address already exists.'
          : `There is some error. _ErrCode: ${err}`;
        res.json({success: false, message: errMessage});
      } else {
        res.json({success: true, message: `${savedUser} successfuly registered.`});
      }
    };
    let role = req.body.role || 0;
    console.log(req.body);
    let newUser = new User({name: req.body.name, password: req.body.password, email: req.body.email, role});

    newUser.save(handleSaveNewUser);
  }
};

let handleAuthenticate = function(req, res) {
  let handleFindUser = function(err, user) {
    if (err) {
      throw err;
    }
    console.log(user);
    if (!user) {
      res.json({success: false, message: 'User not found.'});
    } else {
      let password = req.body.password;
      user.comparePassword(password, (err, isMatch) => {
        if (!err && isMatch) {
          let userInfo = {
            user: user.getUserInfo()
          };
          let token = jwt.sign(userInfo, config.token.secret, config.token.options);
          res.json({success: true, token: `JWT ${token}`});
        } else {
          res.json({
            success: false,
            message: `Authenticatoin failed ${ !isMatch
              ? 'Wrong Password'
              : err}`
          });
        }
      });
    }
  };
  console.log(req.body.email);
  User.findOne({
    email: req.body.email
  }, handleFindUser);
};

let handleDeleteUser = function(req, res) {
  let query = {
    _id: req.params.id
  };

  let handleResponse = function(err) {
    if (err) {
      res.json({success: false, message: 500});
    } else {
      res.json({success: true, message: 200});
    }
  };

  User.remove(query, handleResponse);
};

module.exports = function(apiRouter) {
  apiRouter.post('/register', handleRegister);
  apiRouter.post('/authenticate', handleAuthenticate);
  apiRouter.delete('/auth/:id', handleDeleteUser);
};
