import express from "express";
import { getAllActivity } from "../controllers/activityController.js";

const router = express.Router();
router.get("/", getAllActivity);

export default router;
