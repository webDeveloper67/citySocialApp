const path = require('path');
const fs = require('fs');
const formidable = require('formidable');
const _ = require('lodash');
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

// Get photo of a user
exports.userPhoto = (req, res, next) => {
  if (req.profile.photo.data) {
    res.set('Content-Type', req.profile.photo.contentType);
    return res.send(req.profile.photo.data);
  }
  next();
};

// List all users
exports.listUsers = asyncMiddleware(async (req, res, next) => {
  const users = await User.find().select('name email updated created');

  if (!users) {
    return next(new ErrorResponse('User not found!', 400));
  }

  res.json(users);
});

// default photo for user
exports.defaultPhoto = (req, res) => {
  return res.sendFile(resolvedImg);
};

// Read Auth user
exports.readUser = (req, res, next) => {
  return res.json(req.user);
};

// Update User
exports.updateUser = asyncMiddleware(async (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {
    if (err) {
      return next(new ErrorResponse('Photo can not be updated', 400));
    }
    let user = req.user;
    user = _.extend(user, fields);
    user.updated = Date.now();

    if (files.photo) {
      user.photo.data = fs.readFileSync(files.photo.path);
      user.photo.contentType = files.photo.type;
    }

    user.save((err, result) => {
      if (err) {
        return next(new ErrorResponse('User profile can not be updated!', 400));
      }

      res.json(user);
    });
  });
});
