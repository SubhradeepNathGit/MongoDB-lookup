const Project = require('../../model/Project');

// Show department-wise total active projects count
exports.Task7_ShowDepartmentWiseTotalActiveProjectsCount = async (req, res) => {
    try {
        const result = await Project.aggregate([
            { $match: { status: 'active' } },
            { $group: { _id: '$departmentId', activeProjects: { $sum: 1 } } },
            { $lookup: { from: 'departments', localField: '_id', foreignField: '_id', as: 'dept' } },
            { $unwind: '$dept' },
            { $project: { departmentName: '$dept.name', activeProjects: 1 } }
        ]);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
