const express = require('express');
const authCont = require('./../controllers/authController');
const userCont = require('./../controllers/userController');
const postCont = require('./../controllers/postController');
const router = express.Router();

router.route('/new/:userId').post(authCont.protect, postCont.createPost);

router.route('/by/:userId').get(authCont.protect, postCont.listPostByUser);

router.route('/photo/:postId').get(postCont.postPhoto);

router.route('/like').put(authCont.protect, postCont.likePost);
router.route('/unlike').put(authCont.protect, postCont.unlikePost);

router.param('userId', userCont.userByID);
router.param('postId', postCont.postByID);

module.exports = router;
