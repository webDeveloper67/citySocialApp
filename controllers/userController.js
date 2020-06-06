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
exports.userByID = (req, res, next, id) => {
  User.findById(id)
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
  return res.json(req.profile);
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

// Remove or delete User
exports.deleteUser = asyncMiddleware(async (req, res, next) => {
  let user = req.profile;

  await User.findByIdAndUpdate(user, { active: false });

  res.status(204).json({
    status: 'success',
    data: null
  });
});

// findPeople
exports.findPeople = asyncMiddleware((req, res, next) => {
  let following = req.profile.following;
  following.push(req.profile._id);

  User.find({ _id: { $nin: following } }, (err, users) => {
    if (err) {
      return next(new ErrorResponse('Unable to find people', 400));
    }
    res.json(users);
  }).select('name');
});

// Add Following Middleware
exports.addFollowing = asyncMiddleware(async (req, res, next) => {
  await User.findByIdAndUpdate(
    req.body.userId,
    { $push: { following: req.body.followId } },
    (err, result) => {
      if (err) {
        return res.status(400).json({
          error: 'errorHandler.getErrorMessage(err)'
        });
      }
      next();
    }
  );
});

// Add Follower
exports.addFollower = asyncMiddleware(async (req, res, next) => {
  await User.findByIdAndUpdate(
    req.body.followId,
    { $push: { followers: req.body.userId } },
    { new: true }
  )
    .populate('following', '_id name')
    .populate('followers', '_id name')
    .exec((err, result) => {
      if (err || !result) {
        return next(new ErrorResponse('Can not be followed', 400));
      }

      res.json(result);
    });
});

// Remove following Middleware
exports.removeFollowing = asyncMiddleware(async (req, res, next) => {
  await User.findByIdAndUpdate(
    req.body.userId,
    { $pull: { following: req.body.unfollowId } },
    (err, result) => {
      if (err) {
        return next(new ErrorResponse('Unable to be unfollowed'));
      }
      next();
    }
  );
});

// Remove follower
exports.removeFollower = asyncMiddleware(async (req, res, next) => {
  await User.findByIdAndUpdate(
    req.body.unfollowId,
    { $pull: { followers: req.body.userId } },
    { new: true }
  )
    .populate('following', '_id name')
    .populate('followers', '_id name')
    .exec((err, result) => {
      if (err) {
        return next(new ErrorResponse('Can not be unfollowed'));
      }

      res.json(result);
    });
});
