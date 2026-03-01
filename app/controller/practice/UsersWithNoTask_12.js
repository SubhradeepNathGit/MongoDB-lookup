const User = require('../../model/User');

// Show users who have NOT been assigned any task
exports.Task12_ShowUsersWithNoAssignedTask = async (req, res) => {
    try {
        const result = await User.aggregate([
            { $lookup: { from: 'tasks', localField: '_id', foreignField: 'assignedTo', as: 'tasks' } },
            { $match: { tasks: { $size: 0 } } }
        ]);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
