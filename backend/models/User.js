const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const User = sequelize.define('User', {
    userId: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        primaryKey: true
    },
    keyword: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    totalKilometers: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    profile: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true,
});

module.exports = User;

