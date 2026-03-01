const User = require('../../model/User');

// Show total salary expense per department
exports.Task6_ShowTotalSalaryExpensePerDepartment = async (req, res) => {
    try {
        const result = await User.aggregate([
            { $group: { _id: '$departmentId', totalSalary: { $sum: '$salary' } } },
            { $lookup: { from: 'departments', localField: '_id', foreignField: '_id', as: 'dept' } },
            { $unwind: '$dept' },
            { $project: { departmentName: '$dept.name', totalSalary: 1 } }
        ]);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
