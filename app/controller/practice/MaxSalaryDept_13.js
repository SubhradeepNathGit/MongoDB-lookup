const User = require('../../model/User');

// Show department with highest salary expense
exports.Task13_ShowDepartmentWithHighestSalaryExpense = async (req, res) => {
    try {
        const result = await User.aggregate([
            { $group: { _id: '$departmentId', totalSalary: { $sum: '$salary' } } },
            { $sort: { totalSalary: -1 } },
            { $limit: 1 },
            { $lookup: { from: 'departments', localField: '_id', foreignField: '_id', as: 'dept' } },
            { $unwind: '$dept' },
            { $project: { departmentName: '$dept.name', totalSalary: 1 } }
        ]);
        res.status(200).json(result[0] || {});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
