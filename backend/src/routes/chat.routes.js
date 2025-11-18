import express from "express";
import { protect } from "../middleware/auth.js";
import { getChatHistory, getStats } from "../controllers/chat.controller.js";

const router = express.Router();

router.get("/history", protect, getChatHistory);
router.get("/stats", protect, getStats);

export default router;
