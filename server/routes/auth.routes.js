const authCtrl = require('../controllers/auth.controller');
const { Router } = require('express');

const router = Router(); // eslint-disable-line new-cap

router
  .route('/auth')
  .post(authCtrl.authenticate)
  .delete(authCtrl.deleteUser);

router.route('/auth/register').post(authCtrl.register);

module.exports = router;
