import express from "express";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// @route GET /api/user/me
router.get("/me", protect, async (req, res) => {
  res.json(req.user);
});

export default router;
