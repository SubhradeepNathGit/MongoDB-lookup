const User = require('../../model/User');

// Count total users in each department
exports.Task2_CountTotalUsersInEachDepartment = async (req, res) => {
    try {
        const result = await User.aggregate([
            { $group: { _id: '$departmentId', totalUsers: { $sum: 1 } } },
            { $lookup: { from: 'departments', localField: '_id', foreignField: '_id', as: 'dept' } },
            { $unwind: '$dept' },
            { $project: { departmentName: '$dept.name', totalUsers: 1 } }
        ]);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
