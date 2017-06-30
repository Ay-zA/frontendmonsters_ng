const mongoose = require('mongoose');
const config = require('../configs/config');
const isDevMode = config.server.env === 'dev';

mongoose.Promise = global.Promise;

const connectionString = isDevMode
  ? config.db.debugConnectionString
  : config.db.connectionString;

mongoose.connect(connectionString, {useMongoClient: true}).then(() => {
  if (isDevMode) {
    config.initMockDatabase();
  }
  console.log('[mongoose]: Connected to database');
}).catch(e => {
  console.error(e);
  process.exit(1);
});

module.exports = {
  mongoose
};
