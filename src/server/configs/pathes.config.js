const path = require('path');

module.exports = {
  favIconPath: path.join(__dirname, '..', '..', 'public', 'assets', 'favicon.ico'),
  distPath: path.join(__dirname, '..', '..'),
  publicPath: path.join(__dirname, '..', '..', 'public'),
  index: path.join(__dirname, '..', '..', 'index.html')
};
