const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Blog = sequelize.define('Blog', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'blogs',
  timestamps: false
});

// Static method to find blog by title
Blog.findByTitle = async function(title) {
  return await this.findOne({
    where: { title }
  });
};
Blog.findById = async function(id) {
  return await this.findOne({
    where: { id }
  });
};

module.exports = Blog;