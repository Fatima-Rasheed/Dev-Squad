const express  = require("express");
const dotenv   = require("dotenv");
const cors     = require("cors");
const mongoose = require("mongoose");

dotenv.config();
const app = express();

// ✅ Body parser
app.use(express.json());

// ✅ CORS middleware for both local & deployed frontend
const allowedOrigins = [
  "http://localhost:5173",      // local dev frontend
  process.env.CLIENT_URL        // deployed frontend
];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");

  // Handle preflight request
  if (req.method === "OPTIONS") return res.sendStatus(200);

  next();
});

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection failed:", err.message));

// ✅ Routes
app.use("/auth", require("./routes/auth"));
app.use("/members", require("./routes/members"));
app.use("/projects", require("./routes/projects"));

// ✅ Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Server running" });
});

// ❌ 404
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ❌ Global error handler
app.use((err, req, res, next) => {
  console.error("Server error:", err.message);
  res.status(500).json({ message: "Internal server error" });
});

// ✅ Start server locally (Vercel handles production)
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;