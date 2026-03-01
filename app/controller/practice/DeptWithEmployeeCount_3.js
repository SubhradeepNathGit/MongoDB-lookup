const Department = require('../../model/Department');

// Show department name with total employee count
exports.Task3_ShowDepartmentNameWithTotalEmployeeCount = async (req, res) => {
    try {
        const result = await Department.aggregate([
            { $lookup: { from: 'users', localField: '_id', foreignField: 'departmentId', as: 'users' } },
            { $project: { name: 1, employeeCount: { $size: '$users' } } }
        ]);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
