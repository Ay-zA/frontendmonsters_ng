const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user.model');
const tokenConfig = require('./token.config');

module.exports = function(passport) {
  let jwtStrategyOpts = {
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: tokenConfig.secret
  };
  let jwtStrategyCallback = function(jwtPayload, done) {
    User.findOne({
      _id: jwtPayload.user._id
    }, (err, user) => {
      if (err) {
        return done(err, false);
      }
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    });
  };
  let jwtStrategy = new JwtStrategy(jwtStrategyOpts, jwtStrategyCallback);
  passport.use(jwtStrategy);
};
