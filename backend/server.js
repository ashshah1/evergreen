const express = require('express');
const { connectDB } = require('./config/db');
const initializeDatabase = require('./config/sequelize');
const authRoutes = require('./routes/authRoutes');
const logRoutes = require('./routes/logRoutes')
const userRoutes = require('./routes/userRoutes'); // Import userRoutes

require('dotenv').config();

const app = express();
app.use(require('cors')());
app.use(express.json());

connectDB();
initializeDatabase();

app.use('/api/auth', authRoutes);
app.use('/api/log', logRoutes) 
app.use('/api/users', userRoutes); // Add userRoutes
app.use('/api/logs', logRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));