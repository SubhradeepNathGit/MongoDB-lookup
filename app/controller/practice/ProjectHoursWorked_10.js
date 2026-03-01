const Task = require('../../model/Task');

// Show total hours worked per project
exports.Task10_ShowTotalHoursWorkedPerProject = async (req, res) => {
    try {
        const result = await Task.aggregate([
            { $group: { _id: '$projectId', totalHours: { $sum: '$hoursWorked' } } },
            { $lookup: { from: 'projects', localField: '_id', foreignField: '_id', as: 'project' } },
            { $unwind: '$project' },
            { $project: { projectName: '$project.name', totalHours: 1 } }
        ]);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
