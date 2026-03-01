const User = require('../../model/User');

// Show all users with their department name
exports.Task1_ShowAllUsersWithDepartmentName = async (req, res) => {
    try {
        const result = await User.aggregate([
            { $lookup: { from: 'departments', localField: 'departmentId', foreignField: '_id', as: 'dept' } },
            { $unwind: '$dept' },
            { $project: { name: 1, departmentName: '$dept.name' } }
        ]);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
