import express from "express";
import {
  createSupplier,
  getSuppliers,
  getSupplier,
  deleteSupplier,
  updateSupplier,
} from "../controllers/supplierController.js";

const router = express.Router();

//GET all suppliers
router.get("/", getSuppliers);

//GET a single supplier
router.get("/:id", getSupplier);

//POST a new supplier
router.post("/", createSupplier);

//DELETE a supplier
router.delete("/:id", deleteSupplier);

//UPDATE a supplier
router.patch("/:id", updateSupplier);

export default router;
