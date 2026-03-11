const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

const auth = async (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "No token provided" });
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    req.user = user; // attach to request
    next();
  } catch (err) {
    console.error("Auth middleware error:", err); // log error for debugging
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

module.exports = auth;