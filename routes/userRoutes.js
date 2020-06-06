const express = require('express');
const userCont = require('./../controllers/userController');
const authCont = require('./../controllers/authController');
const router = express.Router();

router.post('/signup', authCont.signup);
router.post('/login', authCont.loginUser);

router.route('/').get(userCont.listUsers);

router.get('/me', authCont.protect, userCont.getMe, userCont.getAuthUser);

router.route('/defaultphoto').get(userCont.defaultPhoto);
router.route('/photo/:userId').get(userCont.userPhoto, userCont.defaultPhoto);

router
  .route('/follow')
  .put(authCont.protect, userCont.addFollowing, userCont.addFollower);

router
  .route('/unfollow')
  .put(authCont.protect, userCont.removeFollowing, userCont.removeFollower);

router.route('/findpeople/:userId').get(authCont.protect, userCont.findPeople);

router
  .route('/:userId')
  .get(userCont.readUser)
  .put(authCont.protect, userCont.updateUser)
  .delete(authCont.protect, userCont.deleteUser);

router.param('userId', userCont.userByID);

module.exports = router;
