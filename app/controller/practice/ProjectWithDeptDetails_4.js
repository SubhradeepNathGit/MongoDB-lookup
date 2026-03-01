const Project = require('../../model/Project');

// Show each project with its department details
exports.Task4_ShowEachProjectWithDepartmentDetails = async (req, res) => {
    try {
        const result = await Project.aggregate([
            { $lookup: { from: 'departments', localField: 'departmentId', foreignField: '_id', as: 'dept' } },
            { $unwind: '$dept' }
        ]);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
