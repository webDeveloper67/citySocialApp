const asyncMiddleware = require('./../helpers/asyncMiddleware');
const ErrorResponse = require('./../helpers/ErrorResponse');
const formidable = require('formidable');
const fs = require('fs');
const Post = require('./../models/PostModel');

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
