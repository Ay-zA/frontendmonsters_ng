let normalizePort = function(val) {
  let port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  port = port >= 0 ? port : false;
  return port;
};

module.exports = { normalizePort };
