const express = require('express');
const authCont = require('./../controllers/authController');
const userCont = require('./../controllers/userController');
const postCont = require('./../controllers/postController');
const router = express.Router();

router.route('/new/:userId').post(authCont.protect, postCont.createPost);

router.route('/by/:userId').get(authCont.protect, postCont.listPostByUser);

router.route('/feed/:userId').get(authCont.protect, postCont.listSocialFeed);

router.route('/photo/:postId').get(postCont.postPhoto);

router.route('/like').put(authCont.protect, postCont.likePost);
router.route('/unlike').put(authCont.protect, postCont.unlikePost);

router.route('/comment').put(postCont.commentPost);
router.route('/uncomment').put(authCont.protect, postCont.uncommentPost);

router
  .route('/:postId')
  .delete(authCont.protect, postCont.postOwner, postCont.removePost);

router.param('userId', userCont.userByID);
router.param('postId', postCont.postByID);

module.exports = router;
