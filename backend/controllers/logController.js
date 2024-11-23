const Log = require('../models/Log');
const User = require('../models/User')
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

	} catch (error) {
		// Rollback the transaction in case of error
		await transaction.rollback();
		console.error('Error updating user or creating log:', error);
		return res.status(500).json({ message: 'Server error' });
	}
};

// Get all logs connected to a specific userId
exports.getLogsByUserId = async (req, res) => {
	const { userId } = req.params; // Get userId from URL params

	try {
		// Find all logs associated with the given userId, selecting only the 'count' field
		const userLogCounts = await Log.findAll({
			where: { userId },
			attributes: ['count'], // Select only the 'count' property
		});

		// Check if logs exist for the given userId
		if (userLogCounts.length === 0) {
			return res.status(404).json({ message: 'No logs found for this user' });
		}

		// Extract 'count' values into a simple array
		const counts = userLogCounts.map(log => log.count);

		res.status(200).json(counts);
	} catch (error) {
		console.error('Error fetching log counts:', error);
		res.status(500).json({ message: 'Server error' });
	}
};

exports.getWalksByDistance = async (req, res) => {
    const { distance } = req.params;
    
    try {
        // get logged walks of a certain distance
        const logs = await Log.findAll({
            where: {
                count: distance
            }
        });

        // check if any logs were found
        if (!logs || logs.length === 0) {
            return res.status(404).json({ message: 'No walks found with the specified distance' });
        }

        res.status(200).json(logs);
    } catch (error) {
        console.error('Error fetching walks by distance:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
