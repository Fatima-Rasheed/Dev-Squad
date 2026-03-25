require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db.js");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Browser auto-requests
app.get("/favicon.ico", (req, res) => res.status(204).end());
app.get("/", (req, res) => {
  res.json({ success: true, message: "Task Manager API is running" });
});

const startServer = async () => {
  try {
    await connectDB();
    console.log("MongoDB connected, starting server...");

    app.use("/api/tasks", require("./routes/tasks"));
    app.use("/api/users", require("./routes/users"));

    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    });

    // ✅ Only starts local server when run directly (node index.js)
    // ✅ Skipped on Vercel since Vercel uses the exported app
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

// ✅ Export for Vercel
module.exports = app;