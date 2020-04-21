const ErrorResponse = require('./../helpers/ErrorResponse');
const asyncMiddleware = require('./../helpers/asyncMiddleware');
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
