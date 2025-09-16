const express = require('express');
const router = express.Router();
const { getBlogById, getALlBlogs, createBlog } = require('../controllers/blogController');

router.get('/', getALlBlogs);

router.get('/:id', getBlogById);

router.post('/create', createBlog);


module.exports = router;