const { sequelize } = require('./db');
const User = require('../models/User');
const Log = require('../models/Log');

const initializeDatabase = async () => {
    try {
        await sequelize.sync({ force: true }); // Use { force: true } to reset the database
        console.log('Database synchronized');
    } catch (error) {
        console.error('Error synchronizing database:', error);
    }
};

module.exports = initializeDatabase;