const path = require('path');
const ErrorResponse = require('./../helpers/ErrorResponse');
const asyncMiddleware = require('./../helpers/asyncMiddleware');
const userImg = './public/img/no-image.png';
const resolvedImg = path.resolve(userImg);
const User = require('./../models/UserModel');

// Find a user by ID
exports.userByID = async (req, res, next, id) => {
  await User.findById(id)
    .populate('following', '_id name')
    .populate('follower', '_id name')
    .exec((err, user) => {
      if (err || !user) {
        return next(new ErrorResponse(`User not found!`, 400));
      }

      req.profile = user;
      next();
    });
};

// setting userId from protect Middleware
exports.getMe = (req, res, next) => {
  req.profile = req.user;

  next();
};

// Get auth user
exports.getAuthUser = (req, res, next) => {
  return res.json(req.profile);
};

// List all users
exports.listUsers = asyncMiddleware(async (req, res, next) => {
  const users = await User.find().select('name email updated created');

  if (!users) {
    return next(new ErrorResponse('User not found!', 400));
  }

  res.json(users);
});

// Get photo of a user
exports.userPhoto = (req, res, next) => {
  if (req.profile.photo.data) {
    res.set('Content-Type', req.profile.photo.contentType);
    return res.send(req.profile.photo.data);
  }
  next();
};

// default photo for user
exports.defaultPhoto = (req, res) => {
  return res.sendFile(resolvedImg);
};
