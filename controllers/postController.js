const asyncMiddleware = require('./../helpers/asyncMiddleware');
const ErrorResponse = require('./../helpers/ErrorResponse');
const formidable = require('formidable');
const fs = require('fs');
const Post = require('./../models/PostModel');

// create a post
exports.createPost = asyncMiddleware((req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return next(err, 400);
    }

    try {
      let newPost = new Post(fields);

      newPost.postedBy = req.user;

      if (files.photo) {
        newPost.photo.data = fs.readFileSync(files.photo.path);
        newPost.photo.contentType = files.photo.type;
      }

      const post = await newPost.save();

      res.json(post);
    } catch (error) {
      console.log(error, '🎯');
      return next(new ErrorResponse(error, 400));
    }
  });
});

// get post by its ID
exports.postByID = async (req, res, next, id) => {
  const post = await Post.findById(id).populate('postedBy', '_id name');

  if (!post) return next(new ErrorResponse('Post not found', 400));
  req.post = post;
  next();
};

// Photo for a post
exports.postPhoto = (req, res, next) => {
  res.set('Content-Type', req.post.photo.contentType);
  return res.send(req.post.photo.data);
};

// Get posts by UserId
exports.listPostByUser = asyncMiddleware(async (req, res, next) => {
  const posts = await Post.find({ postedBy: req.user._id })
    .populate('comments', 'text created')
    .populate('comments.postedBy', '_id name')
    .populate('postedBy', '_id name')
    .sort('-created');

  if (!posts) {
    return next(new ErrorResponse('Posts for this user can not be found', 400));
  }

  res.json(posts);
});
