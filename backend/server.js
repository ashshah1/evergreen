const express = require('express');
const { connectDB } = require('./config/db');
const initializeDatabase = require('./config/sequelize');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(require('cors')());

connectDB();
initializeDatabase();

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));