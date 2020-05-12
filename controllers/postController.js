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

// like a post
exports.likePost = asyncMiddleware(async (req, res, next) => {
  const post = await Post.findByIdAndUpdate(
    req.body.postId,
    { $push: { likes: req.body.userId } },
    { new: true }
  );

  if (!post) {
    return next(new ErrorResponse('Post can not be liked.', 400));
  }

  res.json(post);
});

// UNLIKE a post
exports.unlikePost = asyncMiddleware(async (req, res, next) => {
  const post = await Post.findByIdAndUpdate(
    req.body.postId,
    { $pull: { likes: req.body.userId } },
    { new: true }
  );

  if (!post) {
    return next(new ErrorResponse('Post can not be unliked.', 400));
  }

  res.json(post);
});

// comment over a post
exports.commentPost = asyncMiddleware(async (req, res, next) => {
  let comment = req.body.comment;
  comment.postedBy = req.body.userId;

  const post = await Post.findByIdAndUpdate(
    req.body.postId,
    { $push: { comments: comment } },
    { new: true }
  )
    .populate('comments.postedBy', '_id name')
    .populate('postedBy', '_id name');

  if (!post) {
    return next(new ErrorResponse('You can not comment on this post', 400));
  }

  res.json(post);
});

// UnComment over a post
exports.uncommentPost = asyncMiddleware(async (req, res, next) => {
  let comment = req.body.comment;
  const post = await Post.findByIdAndUpdate(
    req.body.postId,
    { $pull: { comments: { _id: comment._id } } },
    { new: true }
  )
    .populate('comments.postedBy', '_id name')
    .populate('postedBy', '_id name');

  if (!post) {
    return next(new ErrorResponse('You can not uncomment this post', 400));
  }

  res.json(post);
});

// Remove a post
exports.removePost = asyncMiddleware(async (req, res, next) => {
  let post = req.post;

  post.remove((err, deletedPost) => {
    if (err || !post) {
      return next(new ErrorResponse('Post not found', 400));
    }
    res.json(deletedPost);
  });
});

// get Owner of a post
exports.postOwner = async (req, res, next) => {
  let postOwner =
    req.post &&
    req.user &&
    req.post.postedBy._id.toString() === req.user._id.toString();

  if (!postOwner) {
    return next(
      new ErrorResponse('User is not authorized to do this action', 403)
    );
  }
  next();
};

// Get Social Feeds
exports.listSocialFeed = asyncMiddleware(async (req, res, next) => {
  let following = req.user.following;

  following.push(req.user._id);

  const posts = await Post.find({ postedBy: { $in: req.user.following } })
    .populate('comments', 'text created')
    .populate('comments.postedBy', '_id name')
    .populate('postedBy', '_id name')
    .sort('-created');

  if (!posts) {
    return next(new ErrorResponse('Posts not found', 400));
  }

  res.json(posts);
});
