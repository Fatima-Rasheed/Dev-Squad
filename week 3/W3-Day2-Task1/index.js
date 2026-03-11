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

const startServer = async () => {
  try {
    // Wait for MongoDB to connect
    await connectDB();
    console.log("MongoDB connected, starting server...");

    // Mount routes AFTER DB connection
    app.use("/api/tasks", require("./routes/tasks"));
    app.use("/api/users", require("./routes/users"));

    // Global error handler
    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
};

startServer();
