const express = require('express');
const router = express.Router();
const { logWalk, getLogsByUserId, getWalksByDistance } = require('../controllers/logController');

router.post('/logWalk', logWalk);
router.get('/user/:userId/counts', getLogsByUserId);
router.get('/distance/:distance', getWalksByDistance);

module.exports = router;