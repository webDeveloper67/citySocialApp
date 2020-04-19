const jwt = require('jsonwebtoken');
const asyncMiddleware = require('./../helpers/asyncMiddleware');
const User = require('./../models/UserModel');

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
