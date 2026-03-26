const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const auth = require("../middleware/auth");
const { body, validationResult } = require("express-validator");

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
 *       500:
 *         description: Internal server error
 */
router.get("/", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }); // ✅ fixed: was req.user._id
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
 *       400:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */
router.post(
  "/",
  auth,
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("completed")
      .optional()
      .isBoolean()
      .withMessage("Completed must be a boolean"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      const task = await Task.create({ ...req.body, user: req.user.id }); // ✅ fixed: was req.user._id
      res.status(201).json({ success: true, data: task });
    } catch (err) {
      console.error("POST /api/tasks error:", err);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  }
);

/**
 * @swagger
 * /api/tasks/{uuid}:
 *   put:
 *     summary: Update an existing task by UUID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: uuid
 *         in: path
 *         required: true
 *         description: Task UUID
 *         schema:
 *           type: string
 *           example: "550e8400-e29b-41d4-a716-446655440000"
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               completed:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       404:
 *         description: Task not found
 *       500:
 *         description: Internal server error
 */
router.put("/:uuid", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { uuid: req.params.uuid, user: req.user.id }, // ✅ fixed: was req.user._id
      req.body,
      { new: true, runValidators: true }
    );

    if (!task)
      return res.status(404).json({ success: false, message: "Task not found" });

    res.json({ success: true, data: task });
  } catch (err) {
    console.error("PUT /api/tasks/:uuid error:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

/**
 * @swagger
 * /api/tasks/{uuid}:
 *   delete:
 *     summary: Delete a task by UUID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: uuid
 *         in: path
 *         required: true
 *         description: Task UUID
 *         schema:
 *           type: string
 *           example: "550e8400-e29b-41d4-a716-446655440000"
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       404:
 *         description: Task not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:uuid", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      uuid: req.params.uuid,
      user: req.user.id, // ✅ fixed: was req.user._id
    });

    if (!task)
      return res.status(404).json({ success: false, message: "Task not found" });

    res.json({ success: true, data: task });
  } catch (err) {
    console.error("DELETE /api/tasks/:uuid error:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = router;