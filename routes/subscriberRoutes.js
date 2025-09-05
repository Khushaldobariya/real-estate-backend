const express = require('express');
const router = express.Router();
const subscriberController = require('../controllers/subscriberController');


router.post('/', subscriberController.subscribeEmail);

module.exports = router;