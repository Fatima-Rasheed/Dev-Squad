
const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const auth = require("../middleware/auth");

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Task management APIs
 */

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Get all tasks for logged-in user
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       500:
 *         description: Internal server error
 */
router.get("/", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id });
    res.json({ success: true, data: tasks });
  } catch (err) {
    console.error("GET /api/tasks error:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 example: Complete backend assignment
 *               description:
 *                 type: string
 *                 example: Finish Task Manager API
 *               completed:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       201:
 *         description: Task created successfully
 *       500:
 *         description: Internal server error
 */
router.post("/", auth, async (req, res) => {
  try {
    const task = await Task.create({ ...req.body, user: req.user._id });
    res.status(201).json({ success: true, data: task });
  } catch (err) {
    console.error("POST /api/tasks error:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Update an existing task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Task ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Update project documentation
 *               description:
 *                 type: string
 *                 example: Add README and API docs
 *               completed:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       404:
 *         description: Task not found
 *       500:
 *         description: Internal server error
 */
router.put("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!task)
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });

    res.json({ success: true, data: task });
  } catch (err) {
    console.error("PUT /api/tasks/:id error:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Task ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       404:
 *         description: Task not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!task)
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });

    res.json({ success: true, data: task });
  } catch (err) {
    console.error("DELETE /api/tasks/:id error:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = router;
