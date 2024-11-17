const bcrypt = require('bcryptjs');
const User = require('../models/User');
const initializeDatabase = require('../config/sequelize');
require('dotenv').config();

const addUser = async (userId, keyword) => {
    try {
        // Initialize database connection
        await initializeDatabase();

        // Check if user already exists
        const existingUser = await User.findOne({ where: { userId } });
        console.log(existingUser)

        if (existingUser) {
            console.log(`User with ID "${userId}" already exists.`);
            return; // Exit the function without creating a new user
        }

        // Hash the keyword
        const hashedKeyword = await bcrypt.hash(keyword, 10);

        // Create new user
        const newUser = await User.create({
            userId,
            keyword: hashedKeyword,
        });

        console.log(`New user created with ID: ${newUser.userId}`);
    } catch (error) {
        console.error('Error adding user:', error);
    } finally {
        // Ensure proper cleanup
        process.exit(0);
    }
};

// Run the script with new userId and keyword
const newUserId = 'admin';
const newKeyword = 'test';
addUser(newUserId, newKeyword);