const Task = require('../../model/Task');

// Find users who worked on more than 2 projects
exports.Task19_FindUsersWorkedOnMoreThan2Projects = async (req, res) => {
    try {
        const result = await Task.aggregate([
            { $group: { _id: '$assignedTo', projectIds: { $addToSet: '$projectId' } } },
            { $project: { _id: 1, projectCount: { $size: '$projectIds' } } },
            { $match: { projectCount: { $gt: 2 } } },
            { $lookup: { from: 'users', localField: '_id', foreignField: '_id', as: 'user' } },
            { $unwind: '$user' },
            { $project: { name: '$user.name', projectCount: 1 } }
        ]);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
