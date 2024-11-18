const express = require('express');
const router = express.Router();
const user = require('../controllers/userController');

router.get('/all', user.getAllUsers)
router.get('/:userId', user.getUserProfile);

module.exports = router;