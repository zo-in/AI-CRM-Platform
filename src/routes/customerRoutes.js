import express from "express";
import {
  createCustomer,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
  searchCustomers,
} from "../controllers/customerController.js";

const router = express.Router();

router.post("/", createCustomer);
router.get("/:id", getCustomerById);
router.put("/:id", updateCustomer);
router.delete("/:id", deleteCustomer);
router.get("/search/query", searchCustomers);

export default router;
