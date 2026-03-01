const Project = require('../../model/Project');

// For each project show: total tasks, total completed tasks, total hours worked
exports.Task14_ShowProjectDetailedReport = async (req, res) => {
    try {
        const result = await Project.aggregate([
            { $lookup: { from: 'tasks', localField: '_id', foreignField: 'projectId', as: 'tasks' } },
            {
                $project: {
                    name: 1,
                    totalTasks: { $size: '$tasks' },
                    completedTasks: { $size: { $filter: { input: '$tasks', as: 't', cond: { $eq: ['$$t.status', 'completed'] } } } },
                    totalHours: { $sum: '$tasks.hoursWorked' }
                }
            }
        ]);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
