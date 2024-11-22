const express = require('express');
const router = express.Router();
const { logWalk, getLogsByUserId } = require('../controllers/logController');

router.post('/logWalk', logWalk);
router.get('/user/:userId/counts', getLogsByUserId);

module.exports = router;