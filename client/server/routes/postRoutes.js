const express = require('express');
const postController = require('./../controller/postController');

const router = express.Router();

// PUBLIC ROUTES
router
  .route('/')
  .get(postController.getAllPosts)
  .post(postController.createPost);

router
  .route('/:id')
  .get(postController.getPostById)
  .patch(postController.updatePost)
  .delete(postController.deletePost);

module.exports = router;
