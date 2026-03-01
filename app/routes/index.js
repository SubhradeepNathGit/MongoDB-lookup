const express = require('express');
const router = express.Router();
const reportController = require('../controller/ReportController');

// Import Practice Controllers
const Task1 = require('../controller/practice/ShowAllUsersWithDept_1');
const Task2 = require('../controller/practice/CountUsersByDept_2');
const Task3 = require('../controller/practice/DeptWithEmployeeCount_3');
const Task4 = require('../controller/practice/ProjectWithDeptDetails_4');
const Task5 = require('../controller/practice/UserTaskCount_5');
const Task6 = require('../controller/practice/SalaryByDept_6');
const Task7 = require('../controller/practice/ActiveProjectsByDept_7');
const Task8 = require('../controller/practice/UserCompletedTaskCount_8');
const Task9 = require('../controller/practice/Top3Performers_9');
const Task10 = require('../controller/practice/ProjectHoursWorked_10');
const Task11 = require('../controller/practice/DeptSummary_11');
const Task12 = require('../controller/practice/UsersWithNoTask_12');
const Task13 = require('../controller/practice/MaxSalaryDept_13');
const Task14 = require('../controller/practice/ProjectDetailedReport_14');
const Task15 = require('../controller/practice/UserRegistrationByMonth_15');
const Task16 = require('../controller/practice/UserTotalHours_16');
const Task17 = require('../controller/practice/HighAvgSalaryDept_17');
const Task18 = require('../controller/practice/ProjectEfficiency_18');
const Task19 = require('../controller/practice/MultiProjectUsers_19');
const Task20 = require('../controller/practice/AdminDashboard_20');

// Report Routes
router.get('/reports/department-summary', reportController.getDepartmentSummary);
router.get('/reports/top-performers', reportController.getTopPerformers);
router.get('/reports/project-efficiency', reportController.getProjectEfficiency);
router.get('/dashboard/admin', reportController.getAdminDashboard);

// Practice Routes
router.get('/practice/1', Task1.Task1_ShowAllUsersWithDepartmentName);
router.get('/practice/2', Task2.Task2_CountTotalUsersInEachDepartment);
router.get('/practice/3', Task3.Task3_ShowDepartmentNameWithTotalEmployeeCount);
router.get('/practice/4', Task4.Task4_ShowEachProjectWithDepartmentDetails);
router.get('/practice/5', Task5.Task5_CountTotalTasksAssignedToEachUser);
router.get('/practice/6', Task6.Task6_ShowTotalSalaryExpensePerDepartment);
router.get('/practice/7', Task7.Task7_ShowDepartmentWiseTotalActiveProjectsCount);
router.get('/practice/8', Task8.Task8_ShowEachUserWithTotalCompletedTasksCount);
router.get('/practice/9', Task9.Task9_FindTop3UsersWithHighestCompletedTaskCount);
router.get('/practice/10', Task10.Task10_ShowTotalHoursWorkedPerProject);
router.get('/practice/11', Task11.Task11_ShowDepartmentSummaryWithUsersProjectsBudget);
router.get('/practice/12', Task12.Task12_ShowUsersWithNoAssignedTask);
router.get('/practice/13', Task13.Task13_ShowDepartmentWithHighestSalaryExpense);
router.get('/practice/14', Task14.Task14_ShowProjectDetailedReport);
router.get('/practice/15', Task15.Task15_ShowMonthlyUserRegistrationCount);
router.get('/practice/16', Task16.Task16_ShowUsersWithTotalHoursWorked);
router.get('/practice/17', Task17.Task17_FindDepartmentsWithAvgSalaryAbove50000);
router.get('/practice/18', Task18.Task18_ShowProjectEfficiencyReport);
router.get('/practice/19', Task19.Task19_FindUsersWorkedOnMoreThan2Projects);
router.get('/practice/20', Task20.Task20_CreateAdminDashboardAggregation);

module.exports = router;