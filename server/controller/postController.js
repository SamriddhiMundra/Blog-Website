const Post = require('./../model/post');
const AppError = require('./../utils/appError');

// GET all posts
exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json({
      status: 'success',
      results: posts.length,
      data: { posts }
    });
  } catch (err) {
    next(new AppError('Failed to fetch posts', 500));
  }
};

// GET one post
exports.getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return next(new AppError('Post not found', 404));

    res.status(200).json({
      status: 'success',
      data: { post }
    });
  } catch (err) {
    next(new AppError('Invalid post ID', 400));
  }
};

// CREATE a post
exports.createPost = async (req, res, next) => {
  try {
    const { title, content, image, author } = req.body;

    if (!author || !title || !content) {
      return next(new AppError('Missing fields', 400));
    }

    const newPost = await Post.create({ title, content, image, author });

    res.status(201).json({
      status: 'success',
      data: { post: newPost }
    });
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

// UPDATE a post
exports.updatePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return next(new AppError('Post not found', 404));

    // Authorization: only original author can update
    if (post.author !== req.body.author) {
      return next(new AppError('Unauthorized to update this post', 403));
    }

    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      status: 'success',
      data: { post: updatedPost }
    });
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

// DELETE a post
exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return next(new AppError('Post not found', 404));

    await post.deleteOne();
    res.status(204).json({ status: 'success', data: null });
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};
