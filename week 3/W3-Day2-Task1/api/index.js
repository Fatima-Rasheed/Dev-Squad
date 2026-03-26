require("dotenv").config();
const express = require("express");
const connectDB = require("../config/db.js");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("../swagger.js");
const cors = require("cors");

const app = express();

// ✅ Middleware
app.use(express.json());
app.use(cors());

// ✅ Root route
app.get("/", (req, res) => {
  res.json({ success: true, message: "Task Manager API is running 🚀" });
});

// ✅ Swagger docs (works on both local and Vercel)
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customCssUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.11.0/swagger-ui.min.css",
    customJs: [
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.11.0/swagger-ui-bundle.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.11.0/swagger-ui-standalone-preset.min.js",
    ],
  })
);

// ✅ Favicon to avoid unnecessary browser requests
app.get("/favicon.ico", (req, res) => res.status(204).end());

// ✅ Routes
app.use("/api/auth", require("../routes/auth.js")); // auth routes (register/login)
app.use("/api/users", require("../routes/users.js")); // optional user management
app.use("/api/tasks", require("../routes/tasks.js")); // your tasks routes

// ✅ Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Internal Server Error" });
});

// ✅ Start server
const startServer = async () => {
  try {
    await connectDB();
    console.log("MongoDB connected, starting server...");

    if (require.main === module) {
      const PORT = process.env.PORT || 3000;
      app.listen(PORT, () =>
        console.log(`Server running at http://localhost:${PORT}`)
      );
    }
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
};

startServer();

module.exports = app;