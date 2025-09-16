const Comment = require('../models/commentModel');
const Blog = require('../models/blogModel');
const { sequelize } = require('../config/db');

// Add a new comment or reply
const addComment = async (req, res) => {
  try {
    const { blog_id, parent_id, user_name, comment_text, is_author_reply } = req.body;
    
    const blog = await Blog.findById(blog_id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    
    if (parent_id) {
      const parentComment = await Comment.findByPk(parent_id);
      if (!parentComment) {
        return res.status(404).json({ message: 'Parent comment not found' });
      }
    }
    
    // Create the comment with created_at timestamp
    const newComment = await Comment.create({
      blog_id,
      parent_id: parent_id || null,
      user_name,
      comment_text,
      is_author_reply: is_author_reply || false,
      created_at: new Date()
    });
    
    res.status(201).json(newComment);
    
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all comments for a blog with nested replies
const getCommentsByBlogId = async (req, res) => {
  try {
    const { blog_id } = req.params;
    
    // Validate blog exists
    const blog = await Blog.findByPk(blog_id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    
    // Get all top-level comments
    const comments = await Comment.findAll({
      where: { 
        blog_id,
        parent_id: null
      },
      order: [['created_at', 'DESC']]
    });
    
  const replies = await Comment.findAll({
      where: { 
        blog_id,
        parent_id: comments.map(comment => comment.id)
      },
      order: [['created_at', 'ASC']]
    });
    
    // Organize replies into a nested structure
    const commentsWithReplies = comments.map(comment => {
      const commentObj = comment.toJSON();
      commentObj.replies = replies
        .filter(reply => reply.parent_id === comment.id)
        .map(reply => reply.toJSON());
      return commentObj;
    });
    
    res.status(200).json({
      success: true,
      message: 'Comments retrieved successfully',
      data: commentsWithReplies
    });
    
  } catch (error) {
    console.error('Error getting comments:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


module.exports = {
  addComment,
  getCommentsByBlogId
};

