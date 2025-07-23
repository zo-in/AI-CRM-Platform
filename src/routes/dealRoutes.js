import express from "express";
import {
  createDeal,
  getDealById,
  updateDeal,
  deleteDeal,
  getDealsForCustomer,
} from "../controllers/dealController.js";

const router = express.Router();

router.post("/", createDeal);
router.get("/:id", getDealById);
router.put("/:id", updateDeal);
router.delete("/:id", deleteDeal);
router.get("/customer/:id", getDealsForCustomer);

export default router;
