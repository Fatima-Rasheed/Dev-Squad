Task Manager RESTful API

A simple RESTful API built with Node.js and Express.js that allows users to manage tasks.
This project demonstrates backend fundamentals including CRUD operations, API routing, request validation, error handling, Postman testing, and Swagger documentation.

The API currently stores data in memory (no database) and supports full task management operations.

🚀 Features

✅ Create a new task
✅ Get all tasks
✅ Get a task by ID
✅ Update an existing task
✅ Delete a task
✅ Request validation
✅ Consistent API response structure
✅ Proper HTTP status codes
✅ Error handling middleware
✅ API documentation with Swagger UI
✅ API testing using Postman

🛠️ Technologies Used

Node.js – JavaScript runtime

Express.js – Backend web framework

Swagger UI – API documentation

Postman – API testing

nodemon – Development auto-reload
Project Structure
task-manager-api
│
├── routes
│   └── tasks.js
│
├── controllers
│   └── taskController.js
│
├── middlewares
│   ├── errorHandler.js
│   └── validateTask.js
│
├── swagger
│   └── swaggerConfig.js
│
├── app.js
├── server.js
├── package.json
└── README.md
⚙️ Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/yourusername/task-manager-api.git
2️⃣ Navigate to the Project
cd task-manager-api
3️⃣ Install Dependencies
npm install
4️⃣ Run the Server
npm run dev
📌 API Base URL
http://localhost:3000/api/tasks
📦 Task Object Structure
{
  "id": 1,
  "title": "Learn Express",
  "completed": false
}
📑 API Response Format
Every endpoint returns a consistent response structure:
{
  "success": true,
  "data": {},
  "message": "Operation successful"
}
🔗 API Endpoints
1️⃣ Get All Tasks
GET
Response
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Learn Express",
      "completed": false
    }
  ],
  "message": "Tasks retrieved successfully"
}
2️⃣ Get Task by ID

GET

/api/tasks/:id

Example:

/api/tasks/1
Response
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Learn Express",
    "completed": false
  },
  "message": "Task retrieved successfully"
}
Error Response
{
  "success": false,
  "message": "Task not found"
}
3️⃣ Create New Task

POST

/api/tasks
Request Body
{
  "title": "Build REST API",
  "completed": false
}
Response
{
  "success": true,
  "data": {
    "id": 2,
    "title": "Build REST API",
    "completed": false
  },
  "message": "Task created successfully"
}

Status Code:

201 Created
4️⃣ Update Task

PUT

/api/tasks/:id
Request Body
{
  "title": "Learn Express Deeply",
  "completed": true
}
Response
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Learn Express Deeply",
    "completed": true
  },
  "message": "Task updated successfully"
}
5️⃣ Delete Task

DELETE

/api/tasks/:id
Response
{
  "success": true,
  "data": null,
  "message": "Task deleted successfully"
}
✅ Request Validation

Validation rules:

Field	Type	Required
title	string	Yes
completed	boolean	Yes

Example validation error:

{
  "success": false,
  "message": "Title is required and must be a string"
}📖 Swagger API Documentation

Swagger UI is available at:

http://localhost:3000/api-docs

Swagger provides:

Interactive API testing

Request body examples

Response examples

Endpoint descriptions

🧪 Postman Testing

All endpoints were tested using Postman.

Steps:

Create requests for all endpoints

Group them into a Postman Collection

Export collection as JSON

Example file:

TaskManagerAPI.postman_collection.json

This file can be imported into Postman for quick testing.
🎯 Learning Outcomes

Through this project you will learn:

Express server setup

RESTful API design

CRUD operations

Middleware usage

Request validation

Error handling

API testing using Postman

API documentation with Swagger
