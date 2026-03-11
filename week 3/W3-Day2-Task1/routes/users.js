const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User authentication endpoints
 */

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Fatima
 *               email:
 *                 type: string
 *                 example: fatima@example.com
 *               password:
 *                 type: string
 *                 example: myStrongPassword
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               token: "jwt_token_here"
 *       400:
 *         description: Email already exists
 */
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "Please provide name, email, and password" });
    }

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ success: false, message: "Email already exists" });

    user = await User.create({ name, email, password });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.status(201).json({ success: true, token });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login user and return JWT token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: fatima@example.com
 *               password:
 *                 type: string
 *                 example: myStrongPassword
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               token: "jwt_token_here"
 *       400:
 *         description: Invalid credentials
 */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Please provide email and password" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ success: false, message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ success: false, message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ success: true, token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;