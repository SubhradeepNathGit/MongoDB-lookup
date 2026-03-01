const User = require('../../model/User');

// Show users with total hours worked across all projects
exports.Task16_ShowUsersWithTotalHoursWorked = async (req, res) => {
    try {
        const result = await User.aggregate([
            { $lookup: { from: 'tasks', localField: '_id', foreignField: 'assignedTo', as: 'tasks' } },
            { $project: { name: 1, totalHours: { $sum: '$tasks.hoursWorked' } } }
        ]);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
