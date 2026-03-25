const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Task Manager API",
      version: "1.0.0",
      description:
        "A simple RESTful Task Manager API built with Node.js and Express.",
    },
    servers: [
      { url: "http://localhost:3000", description: "Local server" },
      { url: "https://w3-day2-task1.vercel.app", description: "Production server" }
    ],
    tags: [
      { name: "Tasks", description: "Task management endpoints" },
      { name: "Auth", description: "User authentication endpoints" },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;