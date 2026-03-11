Task Manager API

Task Manager API (v2) is a robust RESTful API built using Node.js and Express.js, with MongoDB for persistent storage, JWT-based authentication, and request validation.
It allows users to securely perform CRUD operations on their tasks and includes Swagger documentation for all endpoints.

Features

User Registration and Login with JWT authentication
Secure routes (users can only access their own tasks)
Create, Read, Update, Delete tasks

Input validation using express-validator
Search tasks by title
Task statistics endpoint
Swagger API documentation
Persistent storage using MongoDB


Technologies Used


Node.js
Express.js
MongoDB + Mongoose
JWT (jsonwebtoken)
bcryptjs
express-validator
Swagger UI & swagger-jsdoc
dotenv
Postman


Project Structure

W3-Day2-Task1│ ├── config │ ├── db.js │ │middleware │ ├── auth.js |├── models │ ├── User.js │ └── Task.js │ ├── routes │ ├── tasks.js │ └── users.js │ └── swagger.js │ ├── index.js │ ├──.env |└── README.md 

Installation & Setup

1. Clone the repository:
git clone https://github.com/Bisma8090/devsquad26/tree/main/v2-auth-mongodb.git

2. Navigate to the project directory:
cd v2-auth-mongodb

3. Install the required dependencies:
npm install

4. Create a .env file in the root directory and add:
MONGO_URI=mongodb://docfatimacode_db_user:TaskManager123@ac-2ibivok-shard-00-00.swq10bs.mongodb.net:27017,ac-2ibivok-shard-00-01.swq10bs.mongodb.net:27017,ac-2ibivok-shard-00-02.swq10bs.mongodb.net:27017/?ssl=true&replicaSet=atlas-tr14md-shard-0&authSource=admin&appName=Cluster0
JWT_SECRET=mysecretkey

5. Start the application:
npm start 

or
npm run dev 

6. Server will start at:
http://localhost:3000

7. Swagger Documentation:
http://localhost:3000/api-docs

Sample Request

POST /api/tasks
Request Body

{
  "title": "Complete",
  "description": "okayy ",
  "completed": true
}

Sample Response

{
  "success": true,
  "data": {
    "title": "Complete",
    "completed": true,
    "user": "69b1086f9b8d91ea570ab753",
    "_id": "69b109ed9b8d91ea570ab757",
    "createdAt": "2026-03-11T06:21:33.888Z",
    "updatedAt": "2026-03-11T06:21:33.888Z",
    "__v": 0
  }
}