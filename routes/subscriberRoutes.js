const express = require('express');
const router = express.Router();
const subscriberController = require('../controllers/subscriberController');

/**
 * @route   POST /api/subscribers
 * @desc    Subscribe email
 * @access  Public
 */
router.post('/', subscriberController.subscribeEmail);

/**
 * @route   GET /api/subscribers
 * @desc    Get all subscribers
 * @access  Public
 */
router.get('/', subscriberController.getSubscribers);

module.exports = router;