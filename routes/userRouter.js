const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.post('/contactForm', userController.sendContactForm);

module.exports = router;