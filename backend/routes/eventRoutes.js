import express from "express";
import Event from "../models/Event.js";

const router = express.Router();

// Create Event
router.post("/", async (req, res) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get All Events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().populate("createdBy").sort({ date: 1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
