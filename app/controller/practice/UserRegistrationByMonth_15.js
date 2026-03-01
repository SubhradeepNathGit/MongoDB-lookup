const User = require('../../model/User');

// Show monthly user registration count (group by month)
exports.Task15_ShowMonthlyUserRegistrationCount = async (req, res) => {
    try {
        const result = await User.aggregate([
            { $group: { _id: { month: { $month: '$createdAt' }, year: { $year: '$createdAt' } }, count: { $sum: 1 } } },
            { $sort: { "_id.year": 1, "_id.month": 1 } }
        ]);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
