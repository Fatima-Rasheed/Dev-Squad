const express = require('express');
const tasks = require('./data');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const app = express();
const PORT = 3000;

app.use(express.json());

// Swagger Docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * tags:
 *   - name: Tasks
 *     description: Task management endpoints
 */

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Get all tasks
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: Tasks retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 - id: 1
 *                   title: Learn Express
 *                   completed: false
 *               message: Tasks retrieved successfully
 */
app.get('/api/tasks', (req, res) => {
  res.json({
    success: true,
    data: tasks,
    message: "Tasks retrieved successfully"
  });
});

/**
 * @swagger
 * /api/tasks/{id}:
 *   get:
 *     summary: Get a single task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Task retrieved successfully
 *       404:
 *         description: Task not found
 */
app.get('/api/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) {
    return res.status(404).json({ success: false, message: "Task not found" });
  }
  res.json({ success: true, data: task, message: "Task retrieved successfully" });
});

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
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
 *                 example: Learn Swagger
 *               completed:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       201:
 *         description: Task created successfully
 */
app.post('/api/tasks', (req, res) => {
  const { title, completed = false } = req.body;
  if (!title || typeof title !== "string") {
    return res.status(400).json({ success: false, message: "Title is required and must be a string" });
  }
  if (typeof completed !== "boolean") {
    return res.status(400).json({ success: false, message: "Completed must be boolean" });
  }
  const newTask = { id: tasks.length + 1, title, completed };
  tasks.push(newTask);
  res.status(201).json({ success: true, data: newTask, message: "Task created successfully" });
});

/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Update an existing task
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Updated task title
 *               completed:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       404:
 *         description: Task not found
 */
app.put('/api/tasks/:id', (req, res) => {
  const { title, completed } = req.body;
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ success: false, message: "Task not found" });
  if (title !== undefined && typeof title !== "string") return res.status(400).json({ success: false, message: "Title must be a string" });
  if (completed !== undefined && typeof completed !== "boolean") return res.status(400).json({ success: false, message: "Completed must be boolean" });
  if (title !== undefined) task.title = title;
  if (completed !== undefined) task.completed = completed;
  res.json({ success: true, data: task, message: "Task updated successfully" });
});

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       404:
 *         description: Task not found
 */
app.delete('/api/tasks/:id', (req, res) => {
  const index = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ success: false, message: "Task not found" });
  const deletedTask = tasks.splice(index, 1);
  res.json({ success: true, data: deletedTask[0], message: "Task deleted successfully" });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});