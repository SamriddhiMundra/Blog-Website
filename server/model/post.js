const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      required: [true, 'A post must have a title'],
      trim: true,
      maxlength: [100, 'A post title must have <= 100 characters'],
    },
    content: {
      type: String,
      required: [true, 'A post must have content'],
      minlength: [5, 'Content must have at least 5 characters'],
      trim: true,
    },
    author: {
      type: String,
      required: [true, 'A post must have an author']
    } 
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
