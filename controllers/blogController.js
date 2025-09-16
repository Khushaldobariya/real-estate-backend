const Blog = require('../models/blogModel');
const Comment = require('../models/commentModel');
const { sequelize } = require('../config/db');


const getALlBlogs = async (req, res) => {
  try {
    const blogs = await Blog.findAll();
    res.status(200).json(blogs);
  } catch (error) {
    console.error('Error getting all blogs:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}

// Get blog by ID with comments and nested replies
const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Find blog by ID
    const blog = await Blog.findById(id);
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    
    // Get all comments for this blog
    const comments = await Comment.findAll({
      where: { 
        blog_id: id,
        parent_id: null 
      },
      order: [['created_at', 'DESC']]
    });
    
    // Get replies for each comment
    const replies = await Comment.findAll({
      where: { 
        blog_id: id,
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
    
    // Return blog with comments
    res.status(200).json({
      id: blog.id,
      title: blog.title,
      comments: commentsWithReplies
    });
    
  } catch (error) {
    console.error('Error getting blog with comments:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


const createBlog = async (req, res) => {
  console.log('req.body', req.body)
  try {
    const { title } = req.body;
    const existingBlog = await Blog.findByTitle( title );
  console.log('existingBlog', existingBlog)
    if (existingBlog) {
      return res.status(200).json({ 
        message: 'A blog with this title already exists'
      });
    }

    // Create new blog if title is unique
    const blog = await Blog.create({ title });
    res.status(200).json({ message: 'Blog created successfully', blog });

  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}

module.exports = {
  getBlogById,
  getALlBlogs,
  createBlog
};