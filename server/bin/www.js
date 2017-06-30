const http = require('http');
const debug = require('debug')('server:server');
const config = require('../configs/config');

const app = require('../server');
const utils = require('../utility/utils');

const port = utils.normalizePort(config.server.port);
app.set('port', port);
const server = http.createServer(app);

server.on('error', error => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
});

server.on('listening', () => {
  let addr = server.address();
  let bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  debug('Listening on ' + bind);
});

server.listen(port);
