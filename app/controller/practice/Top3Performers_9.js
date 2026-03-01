const Task = require('../../model/Task');

// Find top 3 users with highest completed task count
exports.Task9_FindTop3UsersWithHighestCompletedTaskCount = async (req, res) => {
    try {
        const result = await Task.aggregate([
            { $match: { status: 'completed' } },
            { $group: { _id: '$assignedTo', count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 3 },
            { $lookup: { from: 'users', localField: '_id', foreignField: '_id', as: 'user' } },
            { $unwind: '$user' },
            { $project: { name: '$user.name', count: 1 } }
        ]);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
