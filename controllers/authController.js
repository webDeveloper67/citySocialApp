const fs = require('fs');
const jwt = require('jsonwebtoken');
const formidable = require('formidable');
const asyncMiddleware = require('./../helpers/asyncMiddleware');
const User = require('./../models/UserModel');
const ErrorResponse = require('./../helpers/ErrorResponse');

// Sign Up a user
exports.signup = asyncMiddleware(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password
  });

  sendTokenResponse(user, 200, res);
});

// Login a user
exports.loginUser = asyncMiddleware(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate email and password
  if (!email || !password) {
    return next(new ErrorResponse('Please provide email and password', 400));
  }

  // check for the user
  const user = await User.findOne({ email }).select('+password');

  if (!user || !await user.comparePassword(password, user.password)) {
    return next(new ErrorResponse('Incorrect Credentials', 401));
  }

  sendTokenResponse(user, 200, res);
});

// Generate Token
const generateToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

// Set the cookie along with the Token
const sendTokenResponse = async (user, httpCode, res) => {
  const token = generateToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    )
  };

  if (process.env.NODE_ENV === 'production') {
    cookieOptions.secure = true;
  }

  res.status(httpCode).cookie('jwt', token, cookieOptions).json({ token });
};

// Protect Auth Middleware
exports.protect = asyncMiddleware(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  // Make sure token exist
  if (!token) {
    return next(new ErrorResponse('Not authorized!!', 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    return next(new ErrorResponse('Not authorized User!', 401));
  }
});
