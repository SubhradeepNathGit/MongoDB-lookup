# MongoDB Aggregation Masterclass: $lookup & $group

A collection of 20 MongoDB aggregation tasks and 4 advanced management reports. This repository serves as a practical guide for mastering complex data relationships in MongoDB using Mongoose and Express.

## Overview
This project demonstrates advanced NoSQL data modeling and aggregation techniques. It implements a structured data model within MongoDB, showcasing how to join collections, perform multi-faceted analysis, and generate business-critical reports without traditional SQL joins.

---

## 📖 MongoDB $lookup Tutorial & Best Practices

The `$lookup` stage performs a left outer join to an unsharded collection in the same database.

### Core Syntax
```javascript
{
  $lookup: {
    from: <collection to join>,
    localField: <field from the input documents>,
    foreignField: <field from the documents of the "from" collection>,
    as: <output array field>
  }
}
```

### Technical Optimization
1.  **Indexing**: Always ensure the `foreignField` is indexed in the target collection to prevent full collection scans during joins.
2.  **Unwind Strategy**: Use `$unwind` after a `$lookup` if you expect a 1:1 relationship to flatten the array, but be mindful of document growth if used on 1:Many relationships early in the pipeline.
3.  **Pipeline Joins**: For complex joins with conditions, use the "joined pipeline" syntax:
    ```javascript
    {
      $lookup: {
        from: "collection",
        let: { local_var: "$field" },
        pipeline: [ { $match: { $expr: { $eq: ["$foreign_field", "$$local_var"] } } } ],
        as: "result"
      }
    }
    ```

---

## 🛠️ System Architecture

### Entity Relationship Model
- **Users**: Central entity with `departmentId` and `salary`.
- **Departments**: Organizational units holding metadata (name, location).
- **Projects**: Linked to Departments, tracking `budget` and `status`.
- **Tasks**: Granular work units linked to both `Users` (assignedTo) and `Projects`.

### Technical Stack
- **Runtime**: Node.js
- **Framework**: Express.js (Minimalist API structure)
- **Database**: MongoDB with Mongoose ODM
- **Documentation**: Structured Technical Markdown

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v14+)
- MongoDB Atlas or Local Instance

### 2. Installation
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory:
```env
MONGODB_URL=your_connection_string
PORT=3005
```

### 4. Database Initialization
This project includes a seeder to ensure logical data consistency across all 4 collections.
```bash
node seed.js
```

---

## 📝 Practice Task Index

### Level 1: Foundational (1–5)
1.  **ShowAllUsersWithDept_1**: Basic `$lookup` with `$unwind` and `$project`.
2.  **CountUsersByDept_2**: Grouping by `departmentId` with `$count`.
3.  **DeptWithEmployeeCount_3**: Joining departments to users to count participants.
4.  **ProjectWithDeptDetails_4**: Joining projects to their parent departments.
5.  **UserTaskCount_5**: Counting tasks per user using `{ $size: "$tasks" }`.

### Level 2: Intermediate (6–12)
6.  **SalaryByDept_6**: Financial aggregation for departmental expenses.
7.  **ActiveProjectsByDept_7**: Multi-stage pipeline with `$match` and `$group`.
8.  **UserCompletedTaskCount_8**: Filtering nested arrays using `$filter`.
9.  **Top3Performers_9**: Sorting and limiting based on completion metrics.
10. **ProjectHoursWorked_10**: Summing numeric fields across joined collections.
11. **DeptSummary_11**: Complex multi-join for high-level management view.
12. **UsersWithNoTask_12**: Identifying gaps in resource allocation (Empty array check).

### Level 3: Advanced (13–20)
13. **MaxSalaryDept_13**: Ranking departments by total financial commitment.
14. **ProjectDetailedReport_14**: Comprehensive status report per project.
15. **UserRegistrationByMonth_15**: Time-series grouping using `$month` and `$year`.
16. **UserTotalHours_16**: Career-wide productivity tracking.
17. **HighAvgSalaryDept_17**: Filtering groups using `$match` after `$group`.
18. **ProjectEfficiency_18**: KPI calculation (Hours worked vs Budget).
19. **MultiProjectUsers_19**: Identifying multi-disciplinary resources.
20. **AdminDashboard_20**: **Master Query** using `$facet` for parallel analytic streams.

---

## 📈 Management Reports (System APIs)

| Endpoint | Purpose | Key MongoDB Operator |
| :--- | :--- | :--- |
| `/reports/department-summary` | Departmental Health | `$lookup` |
| `/reports/top-performers` | Employee Recognition | `$sort`, `$limit` |
| `/reports/project-efficiency` | Financial Stewardship | `$setUnion` (Unique counts) |
| `/dashboard/admin` | Global Oversight | `$facet` (Parallel aggregation) |

---

## 📂 Project Organization
```text
├── app/
│   ├── config/      # DB Connection Logic
│   ├── controller/  # Business Logic Components
│   │   └── practice/# Atomic Task Implementations (Name_Number.js)
│   ├── model/       # Data Schema Definitions
│   └── routes/      # API Gateway (index.js)
├── .env             # Application Constants
├── app.js           # Bootstrap / Entry Point
└── seed.js          # strategic Data Seeder
```

## 📜 Professional Standard
Each controller in this project is designed to be **production-ready**, featuring proper error handling, status codes, and optimized aggregation pipelines. This codebase serves as an ideal reference for technical proficiency and backend system design.
