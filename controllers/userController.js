const ErrorResponse = require('./../helpers/ErrorResponse');
const asyncMiddleware = require('./../helpers/asyncMiddleware');
const User = require('./../models/UserModel');

exports.userByID = asyncMiddleware(async (req, res, next, id) => {
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
});
