const User = require('../../model/User');

// Show each user with total completed tasks count
exports.Task8_ShowEachUserWithTotalCompletedTasksCount = async (req, res) => {
    try {
        const result = await User.aggregate([
            { $lookup: { from: 'tasks', localField: '_id', foreignField: 'assignedTo', as: 'tasks' } },
            {
                $project: {
                    name: 1,
                    completedTasks: {
                        $size: { $filter: { input: '$tasks', as: 'task', cond: { $eq: ['$$task.status', 'completed'] } } }
                    }
                }
            }
        ]);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
