const express  = require("express");
const dotenv   = require("dotenv");
const cors     = require("cors");
const mongoose = require("mongoose");

dotenv.config();

const app = express();

// ✅ ================= CORS CONFIG =================
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

// ✅ Handle preflight
app.options("*", cors());
// =================================================


// ✅ Body parser
app.use(express.json());


// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
  });


// ✅ Health check route
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Server is running" });
});


// ✅ Routes
app.use("/auth", require("./routes/auth"));
app.use("/members", require("./routes/members"));
app.use("/projects", require("./routes/projects"));


// ❌ 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});


// ❌ Global error handler
app.use((err, req, res, next) => {
  console.error("Server error:", err.message);
  res.status(500).json({ message: "Internal server error" });
});


// ✅ START SERVER (THIS WAS MISSING)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});