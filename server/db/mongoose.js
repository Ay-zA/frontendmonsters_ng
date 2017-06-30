const mongoose = require('mongoose');
const { db: dbConfig, server: serverConfig } = require('../configs/config');
const isDevMode = serverConfig.isDev;
mongoose.Promise = global.Promise;

const connectionString = isDevMode ?
  dbConfig.debugConnectionString :
  dbConfig.connectionString;

mongoose.connect(connectionString);

mongoose.connection.on('connected', function() {
  console.log('Mongoose default connection open to ' + connectionString);
  if (isDevMode) {
    require('../utility/mockDb')();
  }
});

mongoose.connection.on('error', function(err) {
  console.log('Mongoose default connection error: ' + err);
});

mongoose.connection.on('disconnected', function() {
  console.log('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
  mongoose.connection.close(function() {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

module.exports = {
  mongoose
};
