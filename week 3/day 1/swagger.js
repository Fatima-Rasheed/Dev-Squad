const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Task Manager API",
      version: "1.0.0",
      description: "A simple RESTful Task Manager API built with Node.js and Express. This API allows users to create, read, update, and delete tasks."
    },
    servers: [
      {
        url: "https://week3-day1backend.vercel.app",
        description: "Production server"
      },
      {
        url: "http://localhost:3000",
        description: "Local server"
      }
    ],
    tags: [
      {
        name: "Tasks",
        description: "Task management endpoints"
      }
    ]
  },

  // Files containing Swagger annotations
  apis: ["./index.js"]
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;