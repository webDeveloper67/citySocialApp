const express = require('express');
const userCont = require('./../controllers/userController');
const authCont = require('./../controllers/authController');
const router = express.Router();

router.post('/signup', authCont.signup);
router.post('/login', authCont.loginUser);

router.get('/me', authCont.protect, userCont.getMe, userCont.getAuthUser);

router.param('userID', userCont.userByID);

module.exports = router;
