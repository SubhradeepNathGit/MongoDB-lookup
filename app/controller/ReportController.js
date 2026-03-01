const User = require('../model/User');
const Department = require('../model/Department');
const Project = require('../model/Project');
const Task = require('../model/Task');
const mongoose = require('mongoose');

exports.getDepartmentSummary = async (req, res) => {
    try {
        const summary = await Department.aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: '_id',
                    foreignField: 'departmentId',
                    as: 'users'
                }
            },
            {
                $lookup: {
                    from: 'projects',
                    localField: '_id',
                    foreignField: 'departmentId',
                    as: 'projects'
                }
            },
            {
                $project: {
                    name: 1,
                    totalUsers: { $size: '$users' },
                    totalProjects: { $size: '$projects' },
                    totalBudget: { $sum: '$projects.budget' }
                }
            }
        ]);
        res.status(200).json(summary);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getTopPerformers = async (req, res) => {
    try {
        const performers = await Task.aggregate([
            { $match: { status: 'completed' } },
            {
                $group: {
                    _id: '$assignedTo',
                    completedTasks: { $sum: 1 }
                }
            },
            { $sort: { completedTasks: -1 } },
            { $limit: 3 },
            {
                $lookup: {
                    from: 'users',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'userDetails'
                }
            },
            { $unwind: '$userDetails' },
            {
                $project: {
                    name: '$userDetails.name',
                    completedTasks: 1
                }
            }
        ]);
        res.status(200).json(performers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getProjectEfficiency = async (req, res) => {
    try {
        const efficiency = await Project.aggregate([
            {
                $lookup: {
                    from: 'tasks',
                    localField: '_id',
                    foreignField: 'projectId',
                    as: 'tasks'
                }
            },
            {
                $project: {
                    name: 1,
                    budget: 1,
                    totalHoursWorked: { $sum: '$tasks.hoursWorked' },
                    totalEmployeesInvolved: { $size: { $ifNull: [{ $setUnion: ['$tasks.assignedTo'] }, []] } }
                }
            }
        ]);
        res.status(200).json(efficiency);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAdminDashboard = async (req, res) => {
    try {
        const dashboard = await User.aggregate([
            {
                $facet: {
                    totalUsers: [{ $count: 'count' }],
                    totalDepartments: [
                        { $limit: 1 },
                        { $lookup: { from: 'departments', pipeline: [{ $count: 'count' }], as: 'dept' } },
                        { $unwind: '$dept' },
                        { $replaceRoot: { newRoot: '$dept' } }
                    ],
                    totalActiveProjects: [
                        { $limit: 1 },
                        { $lookup: { from: 'projects', pipeline: [{ $match: { status: 'active' } }, { $count: 'count' }], as: 'proj' } },
                        { $unwind: '$proj' },
                        { $replaceRoot: { newRoot: '$proj' } }
                    ],
                    totalCompletedTasks: [
                        { $limit: 1 },
                        { $lookup: { from: 'tasks', pipeline: [{ $match: { status: 'completed' } }, { $count: 'count' }], as: 'task' } },
                        { $unwind: '$task' },
                        { $replaceRoot: { newRoot: '$task' } }
                    ],
                    totalSalaryExpense: [
                        { $group: { _id: null, total: { $sum: '$salary' } } }
                    ]
                }
            },
            {
                $project: {
                    totalUsers: { $ifNull: [{ $arrayElemAt: ['$totalUsers.count', 0] }, 0] },
                    totalDepartments: { $ifNull: [{ $arrayElemAt: ['$totalDepartments.count', 0] }, 0] },
                    totalActiveProjects: { $ifNull: [{ $arrayElemAt: ['$totalActiveProjects.count', 0] }, 0] },
                    totalCompletedTasks: { $ifNull: [{ $arrayElemAt: ['$totalCompletedTasks.count', 0] }, 0] },
                    totalSalaryExpense: { $ifNull: [{ $arrayElemAt: ['$totalSalaryExpense.total', 0] }, 0] }
                }
            }
        ]);
        res.status(200).json(dashboard[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
