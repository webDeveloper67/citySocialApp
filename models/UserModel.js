const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Name is required']
  },
  email: {
    type: String,
    trim: true,
    unique: 'Email already exists',
    match: [/.+.+\..+/, 'Please fill a valid email address'],
    required: [true, 'Email is required']
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: 8,
    select: false
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  },
  about: {
    type: String,
    trim: true
  },
  photo: {
    data: Buffer,
    contentType: String
  },
  active: {
    type: Boolean,
    default: true,
    select: false
  },
  following: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  followers: [{ type: mongoose.Schema.ObjectId, ref: 'User' }]
});

// bcrypt password
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// compare passwords
userSchema.methods.comparePassword = async function(candidatePass, userPass) {
  return await bcrypt.compare(candidatePass, userPass);
};

userSchema.pre(/^find/, function(next) {
  this.find({ active: { $ne: false } });

  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
