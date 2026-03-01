const User = require('../../model/User');

// Create Admin Dashboard Aggregation: total users, total departments, total active projects, total completed tasks, total salary expense (multi-faceted query)
exports.Task20_CreateAdminDashboardAggregation = async (req, res) => {
    try {
        const result = await User.aggregate([
            {
                $facet: {
                    totalUsers: [{ $count: 'count' }],
                    totalDepartments: [
                        { $limit: 1 },
                        { $lookup: { from: 'departments', pipeline: [{ $count: 'count' }], as: 'd' } },
                        { $unwind: '$d' },
                        { $replaceRoot: { newRoot: '$d' } }
                    ],
                    totalActiveProjects: [
                        { $limit: 1 },
                        { $lookup: { from: 'projects', pipeline: [{ $match: { status: 'active' } }, { $count: 'count' }], as: 'p' } },
                        { $unwind: '$p' },
                        { $replaceRoot: { newRoot: '$p' } }
                    ],
                    totalCompletedTasks: [
                        { $limit: 1 },
                        { $lookup: { from: 'tasks', pipeline: [{ $match: { status: 'completed' } }, { $count: 'count' }], as: 't' } },
                        { $unwind: '$t' },
                        { $replaceRoot: { newRoot: '$t' } }
                    ],
                    totalSalary: [{ $group: { _id: null, total: { $sum: '$salary' } } }]
                }
            },
            {
                $project: {
                    totalUsers: { $ifNull: [{ $arrayElemAt: ['$totalUsers.count', 0] }, 0] },
                    totalDepartments: { $ifNull: [{ $arrayElemAt: ['$totalDepartments.count', 0] }, 0] },
                    totalActiveProjects: { $ifNull: [{ $arrayElemAt: ['$totalActiveProjects.count', 0] }, 0] },
                    totalCompletedTasks: { $ifNull: [{ $arrayElemAt: ['$totalCompletedTasks.count', 0] }, 0] },
                    totalSalaryExpense: { $ifNull: [{ $arrayElemAt: ['$totalSalary.total', 0] }, 0] }
                }
            }
        ]);
        res.status(200).json(result[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
