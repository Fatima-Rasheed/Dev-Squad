require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db.js");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger.js");
const cors = require("cors");

const app = express();

// ✅ Middleware
app.use(express.json());
app.use(cors());

// ✅ DB connection guard — runs before every request on Vercel
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error("DB connection failed:", err);
    res.status(500).json({ success: false, message: "DB connection failed" });
  }
});

// ✅ Root route
app.get("/", (req, res) => {
  res.json({ success: true, message: "Task Manager API is running 🚀" });
});

// ✅ Favicon
app.get("/favicon.ico", (req, res) => res.status(204).end());

// ✅ Swagger docs
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

// ✅ Routes
app.use("/api/auth", require("./routes/auth.js"));
app.use("/api/users", require("./routes/users.js"));
app.use("/api/tasks", require("./routes/tasks.js"));

// ✅ Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Internal Server Error" });
});

// ✅ Local development only — Vercel does NOT need app.listen()
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  connectDB()
    .then(() => {
      app.listen(PORT, () =>
        console.log(`Server running at http://localhost:${PORT}`)
      );
    })
    .catch((err) => {
      console.error("Failed to connect to DB:", err);
      process.exit(1); // ✅ safe here — only runs locally, never on Vercel
    });
}

module.exports = app; // ✅ Vercel just imports this and handles requests