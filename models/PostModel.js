const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  text: {
    type: String,
    required: [true, 'Name is required']
  },
  photo: {
    data: Buffer,
    contentType: String
  },
  likes: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  comments: [
    {
      text: String,
      created: { type: Date, default: Date.now },
      postedBy: { type: mongoose.Schema.ObjectId, ref: 'User' }
    }
  ],
  postedBy: { type: mongoose.Schema.ObjectId, ref: 'User' },
  created: {
    type: Date,
    default: Date.now
  }
});

const Post = mongoose.model('Post', postSchema, 'posts');

module.exports = Post;
