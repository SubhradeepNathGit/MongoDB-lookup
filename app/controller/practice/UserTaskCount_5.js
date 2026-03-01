const User = require('../../model/User');

// Count total tasks assigned to each user
exports.Task5_CountTotalTasksAssignedToEachUser = async (req, res) => {
    try {
        const result = await User.aggregate([
            { $lookup: { from: 'tasks', localField: '_id', foreignField: 'assignedTo', as: 'tasks' } },
            { $project: { name: 1, taskCount: { $size: '$tasks' } } }
        ]);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
