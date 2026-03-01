const Project = require('../../model/Project');

// Show project efficiency report: project name, budget, total hours worked, total employees involved
exports.Task18_ShowProjectEfficiencyReport = async (req, res) => {
    try {
        const result = await Project.aggregate([
            { $lookup: { from: 'tasks', localField: '_id', foreignField: 'projectId', as: 'tasks' } },
            {
                $project: {
                    name: 1,
                    budget: 1,
                    totalHours: { $sum: '$tasks.hoursWorked' },
                    employeeCount: { $size: { $ifNull: [{ $setUnion: ['$tasks.assignedTo'] }, []] } }
                }
            }
        ]);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
