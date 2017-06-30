const port = process.env.PORT || '3000';
const env = process.env.NODE_ENV || 'dev';
const isDev = env === 'dev';

module.exports = {
  port,
  env,
  isDev,
};
