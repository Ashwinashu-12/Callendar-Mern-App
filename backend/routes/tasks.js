import express from "express";
import Task from "../models/Task.js";
import authMiddleware from "../middleware/authMiddleware.js"; // ✅ verify JWT

const router = express.Router();

// Create task
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, description, date } = req.body;

    const task = new Task({
      title,
      description,
      date,
      user: req.user.id // 👈 store logged-in user ID
    });

    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: "Failed to create task" });
  }
});

// Get tasks for logged-in user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }); // 👈 only this user’s tasks
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

// Delete task
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id }); // 👈 only delete own task
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete task" });
  }
});

export default router;
