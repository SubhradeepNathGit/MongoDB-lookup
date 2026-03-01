const Department = require('../../model/Department');

// Show each department with: total users, total projects, total budget
exports.Task11_ShowDepartmentSummaryWithUsersProjectsBudget = async (req, res) => {
    try {
        const result = await Department.aggregate([
            { $lookup: { from: 'users', localField: '_id', foreignField: 'departmentId', as: 'users' } },
            { $lookup: { from: 'projects', localField: '_id', foreignField: 'departmentId', as: 'projects' } },
            {
                $project: {
                    name: 1,
                    totalUsers: { $size: '$users' },
                    totalProjects: { $size: '$projects' },
                    totalBudget: { $sum: '$projects.budget' }
                }
            }
        ]);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
