const asyncMiddleware = require('./../helpers/asyncMiddleware');
const User = require('./../models/UserModel');

exports.signUp = asyncMiddleware(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password
  });

  res.json(user);
});
