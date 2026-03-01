require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./app/model/User');
const Department = require('./app/model/Department');
const Project = require('./app/model/Project');
const Task = require('./app/model/Task');

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/product-crud');
        console.log('Connected to MongoDB');

        // Clear existing data
        await User.deleteMany({});
        await Department.deleteMany({});
        await Project.deleteMany({});
        await Task.deleteMany({});

        // Add Departments
        const depts = await Department.insertMany([
            { name: 'Engineering', location: 'New York' },
            { name: 'Marketing', location: 'London' },
            { name: 'Human Resources', location: 'Tokyo' }
        ]);

        // Add Users
        const users = await User.insertMany([
            { name: 'John Doe', email: 'john@example.com', role: 'employee', departmentId: depts[0]._id, salary: 60000, createdAt: new Date('2023-01-15') },
            { name: 'Jane Smith', email: 'jane@example.com', role: 'manager', departmentId: depts[0]._id, salary: 85000, createdAt: new Date('2023-02-20') },
            { name: 'Mike Ross', email: 'mike@example.com', role: 'employee', departmentId: depts[1]._id, salary: 45000, createdAt: new Date('2023-03-10') },
            { name: 'Rachel Zane', email: 'rachel@example.com', role: 'admin', departmentId: depts[2]._id, salary: 95000, createdAt: new Date('2023-04-05') },
            { name: 'Harvey Specter', email: 'harvey@example.com', role: 'manager', departmentId: depts[1]._id, salary: 120000, createdAt: new Date('2023-05-12') }
        ]);

        // Add Projects
        const projs = await Project.insertMany([
            { name: 'Project Alpha', departmentId: depts[0]._id, budget: 100000, status: 'active' },
            { name: 'Project Beta', departmentId: depts[0]._id, budget: 50000, status: 'completed' },
            { name: 'Project Gamma', departmentId: depts[1]._id, budget: 75000, status: 'active' },
            { name: 'Project Delta', departmentId: depts[2]._id, budget: 30000, status: 'active' },
            { name: 'Project Epsilon', departmentId: depts[0]._id, budget: 120000, status: 'active' }
        ]);

        // Add Tasks (Ensure John Doe has tasks in 3 projects for Task 19)
        await Task.insertMany([
            { title: 'Task 1', assignedTo: users[0]._id, projectId: projs[0]._id, status: 'completed', hoursWorked: 10 },
            { title: 'Task 2', assignedTo: users[0]._id, projectId: projs[1]._id, status: 'pending', hoursWorked: 5 },
            { title: 'Task 3', assignedTo: users[0]._id, projectId: projs[4]._id, status: 'completed', hoursWorked: 15 }, // John has 3 projects
            { title: 'Task 4', assignedTo: users[1]._id, projectId: projs[0]._id, status: 'completed', hoursWorked: 20 },
            { title: 'Task 5', assignedTo: users[2]._id, projectId: projs[2]._id, status: 'completed', hoursWorked: 12 },
            { title: 'Task 6', assignedTo: users[3]._id, projectId: projs[3]._id, status: 'pending', hoursWorked: 8 },
            { title: 'Task 7', assignedTo: users[4]._id, projectId: projs[2]._id, status: 'completed', hoursWorked: 18 },
            { title: 'Task 8', assignedTo: users[1]._id, projectId: projs[1]._id, status: 'completed', hoursWorked: 25 }
        ]);

        console.log('Database seeded successfully');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedData();
