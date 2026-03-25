const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Task Manager API",
      version: "1.0.0",
      description:
        "A simple RESTful Task Manager API built with Node.js and Express. This API allows users to create, read, update, and delete tasks."
    },
    servers: [
      { url: "http://localhost:3000", description: "Local server" }
    ],
    tags: [
      { name: "Tasks", description: "Task management endpoints" },
      { name: "Auth", description: "User authentication endpoints" }
    ],
    components: { // ✅ must be inside definition
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    },
    security: [{ bearerAuth: [] }] // ✅ also inside definition
  },
  apis: ["./routes/*.js"] // path to your annotated route files
};

const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;