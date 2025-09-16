const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Blog = require('./blogModel');

const Comment = sequelize.define('Comment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  blog_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'blogs',
      key: 'id'
    }
  },
  parent_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'comments',
      key: 'id'
    }
  },
  user_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
 
  comment_text: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  is_author_reply: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'comments',
  timestamps: false
});
// Find all replies for a comment
Comment.findReplies = async function(commentId, blogId) {
  return await this.findAll({
    where: {
      parent_id: commentId,
      blog_id: blogId
    },
    order: [['created_at', 'ASC']]
  });
};

// Get full comment thread including nested replies
Comment.getFullThread = async function(commentId) {
  const getRepliesRecursive = async (parentId) => {
    const replies = await this.findAll({
      where: { parent_id: parentId },
      order: [['created_at', 'ASC']]
    });

    for (let reply of replies) {
      reply.dataValues.replies = await getRepliesRecursive(reply.id);
    }

    return replies;
  };

  const comment = await this.findByPk(commentId);
  if (!comment) return null;

  comment.dataValues.replies = await getRepliesRecursive(commentId);
  return comment;
};


// Define associations
Comment.belongsTo(Blog, { foreignKey: 'blog_id' });
Blog.hasMany(Comment, { foreignKey: 'blog_id' });

// Self-referencing association for nested comments
Comment.belongsTo(Comment, { as: 'parent', foreignKey: 'parent_id' });
Comment.hasMany(Comment, { as: 'replies', foreignKey: 'parent_id' });

module.exports = Comment;