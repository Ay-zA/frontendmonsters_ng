const pathes = require('./pathes.config');
const serverConfig = require('./server.config');
const dbConfig = require('./db.config');
const tokenConfig = require('./token.config');
const passportConfig = require('./passport.config');
const jwtStrategy = require('./jwtStrategy');

module.exports = {
  db: dbConfig,
  server: serverConfig,
  pathes,
  token: tokenConfig,
  initJWTPassport: jwtStrategy,
  passport: passportConfig
};
