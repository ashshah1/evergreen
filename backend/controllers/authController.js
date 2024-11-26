const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    const { userId, keyword } = req.body;
    console.log(userId, keyword)

    const user = await User.findOne({ where: { userId } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(keyword, user.keyword);
    if (!isMatch) return res.status(401).json({ message: 'Invalid keyword' });

    const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(200).json({ token });
};