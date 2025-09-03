const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();
-

router.post("/contactForm", userController.sendContactForm); // Fixed typo in route name and controller method
module.exports = router;