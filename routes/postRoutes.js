const express = require('express');
const authCont = require('./../controllers/authController');
const userCont = require('./../controllers/userController');
const postCont = require('./../controllers/postController');
const router = express.Router();

router.route('/new/:userId').post(authCont.protect, postCont.createPost);

router.param('userId', userCont.userByID);

module.exports = router;
