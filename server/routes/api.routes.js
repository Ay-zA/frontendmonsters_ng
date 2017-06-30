const { Router } = require('express');
const apiRouter = Router(); // eslint-disable-line new-cap

const courseRoutes = require('./course.routes');
const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
const requestRoutes = require('./request.routes');

apiRouter.get('/health-check', (req, res) =>
  res.send('OK')
);

apiRouter.use('/auth', authRoutes);
apiRouter.use('/course', courseRoutes);
apiRouter.use('/user', userRoutes);
apiRouter.use('/request', requestRoutes);

module.exports = apiRouter;
