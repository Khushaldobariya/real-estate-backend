const express = require('express');
const router = express.Router();
const { addComment, getCommentsByBlogId } = require('../controllers/commentController');

// Add a new comment
router.post('/', addComment);

// Get all comments for a blog
router.get('/:blog_id', getCommentsByBlogId);

module.exports = router;