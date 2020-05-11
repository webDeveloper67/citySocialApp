const express = require('express');
const userCont = require('./../controllers/userController');
const authCont = require('./../controllers/authController');
const router = express.Router();

router.post('/signup', authCont.signup);
router.post('/login', authCont.loginUser);

router.route('/').get(userCont.listUsers);

router.get('/me', authCont.protect, userCont.getMe, userCont.getAuthUser);

router.route('/defaultphoto').get(userCont.defaultPhoto);
router.route('/photo/:userID').get(userCont.userPhoto, userCont.defaultPhoto);

router.param('userID', userCont.userByID);

module.exports = router;
