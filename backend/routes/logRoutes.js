const express = require('express');
const router = express.Router();
const { logWalk } = require('../controllers/logController');

router.post('/logWalk', logWalk);

module.exports = router;