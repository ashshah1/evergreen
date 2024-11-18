const User = require('../models/User');

exports.getUserProfile = async (req, res) => {
    const { userId } = req.params;
    try {
        // Fetch the user from the database
        const user = await User.findOne({ where: { userId } });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Return the user's details, including profile picture URL
        res.json({
            userId: user.userId,
            profilePictureUrl: user.profilePictureUrl,
        });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['userId', 'totalKilometers']
        });

        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Server error' });
    }
}
