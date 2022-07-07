const express = require('express');
const router = express.Router();

const {register,getAlluser,getUser,login,logout,forgotPassword,resetPassword} = require('../controller/auth');

router.route('/register').post(register);
router.route('/').get(getAlluser);
router.route('/:id').get(getUser);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);
router.route('/login').post(login);
router.route('/logout').get(logout);

module.exports = router;