const express  = require("express");
const dotenv   = require("dotenv");
const cors     = require("cors");
const mongoose = require("mongoose");

dotenv.config();
const app = express();

// ✅ Body parser
app.use(express.json());

// ✅ CORS - vercel.json handles headers, this just enables it
app.use(cors({ origin: "*" }));
// app.options("*", cors());

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection failed:", err.message));

// ✅ Routes
app.use("/auth",     require("./routes/auth"));
app.use("/members",  require("./routes/members"));
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