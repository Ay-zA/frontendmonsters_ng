const path = require('path');

const client = path.join(__dirname, '..', '..', 'client');
const pub = path.join(client, 'public');
const assets = path.join(pub, 'assets');
const index = path.join(pub, 'index.html');
const favIcon = path.join(assets, 'favicon.ico');

module.exports = {
  pub,
  favIcon,
  assets,
  index,
};
