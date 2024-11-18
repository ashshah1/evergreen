const Log = require('../models/Log');
const User = require('../models/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sequelize } = require('../config/db');
const { Op } = require('sequelize'); // Correct place to import Op

exports.logWalk = async (req, res) => {
	const transaction = await sequelize.transaction() // Start a transaction
	
	const { userId, distance, date } = req.body;
	try {

		// check if walk for given date OR distance exists
		const existingWalk = await Log.findOne({
			where: {
				userId: userId,
				[Op.or]: [
					{ date: date },
					{ count: distance }
				]
			}
		});

		// If a walk already exists, return a conflict error
		if (existingWalk) {
			if (existingWalk.date === date) {
                await transaction.rollback();
                return res.status(409).json({ message: 'Walk already exists for the given date' });
            }
            if (existingWalk.count === distance) {
                await transaction.rollback();
                return res.status(409).json({ message: 'Walk already exists for the given distance' });
            }
		}

		// add new walk
		const newWalk = await Log.create({
			userId: userId,
			count: distance,
			date: date
		}, { transaction })

		// update total km in user table
		const user = await User.findOne({ where: { userId } })
		const newDistance = parseInt(user.totalKilometers) + parseInt(distance)

		const [updatedRowsCount] = await User.update(
			{ totalKilometers: newDistance }, 
			{ where: { userId }, transaction }
		);

		// Check if the user was found and updated
        if (updatedRowsCount === 0) {
            await transaction.rollback();
            return res.status(404).json({ message: 'User not found' });
        }
	
		// Commit the transaction if both operations succeed
        await transaction.commit();

		console.log(`New ${newWalk.count}km added for ${newWalk.userId}`);
    } catch (error) {
		// Rollback the transaction in case of error
        await transaction.rollback();
        console.error('Error updating user or creating log:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};