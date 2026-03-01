const User = require('../../model/User');

// Find departments where average salary > 50,000
exports.Task17_FindDepartmentsWithAvgSalaryAbove50000 = async (req, res) => {
    try {
        const result = await User.aggregate([
            { $group: { _id: '$departmentId', avgSalary: { $avg: '$salary' } } },
            { $match: { avgSalary: { $gt: 50000 } } },
            { $lookup: { from: 'departments', localField: '_id', foreignField: '_id', as: 'dept' } },
            { $unwind: '$dept' },
            { $project: { departmentName: '$dept.name', avgSalary: 1 } }
        ]);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
