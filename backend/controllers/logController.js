const Log = require('../models/Log');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.logWalk = async (req, res) => {
	try {
		const { userId, distance, date } = req.body;
		// console.log(userId, distance, date)
		const newWalk = await Log.create({
			userId: userId,
			count: distance,
			date: date
		})
	
			console.log(`New ${newWalk.count}km added for ${newWalk.userId}`);
    } catch (error) {
        console.error('Error logging walk:', error);
    }
};