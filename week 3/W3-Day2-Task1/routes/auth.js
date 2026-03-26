const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");

// POST /api/auth/register
router.post(
  "/register",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 chars"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ success: false, errors: errors.array() });

    try {
      const { name, email, password } = req.body;

      let user = await User.findOne({ email });
      if (user)
        return res.status(400).json({ success: false, message: "Email already exists" });

      user = await User.create({ name, email, password });

      // JWT includes UUID
      const token = jwt.sign({ id: user._id, uuid: user.uuid }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      // ✅ Send UUID in response
      res.status(201).json({
        success: true,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          uuid: user.uuid,
        },
        token,
      });
    } catch (err) {
      console.error("Register error:", err);
      res.status(500).json({ success: false, message: "Server error" });
    }
  }
);

// POST /api/auth/login
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ success: false, errors: errors.array() });

    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ success: false, message: "User not found" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ success: false, message: "Invalid password" });

      const token = jwt.sign({ id: user._id, uuid: user.uuid }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      res.json({
        success: true,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          uuid: user.uuid,
        },
        token,
      });
    } catch (err) {
      console.error("Login error:", err);
      res.status(500).json({ success: false, message: "Server error" });
    }
  }
);

module.exports = router;