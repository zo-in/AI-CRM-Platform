import express from "express";
import {
  summarizeInteraction,
  createInteraction,
  getCustomerMemory,
} from "../controllers/interactionController.js";

const router = express.Router();

router.post("/", createInteraction);
router.post("/:id/ai-summarize", summarizeInteraction);
router.get("/memory/:customerId", getCustomerMemory);

export default router;
