import express from "express";
import {
  createSupplier,
  getSuppliers,
  getSupplier,
  deleteSupplier,
  updateSupplier,
  getSupplierSearch,
} from "../controllers/supplierController.js";
import Supplier from "../models/supplierModel.js";

const router = express.Router();

//GET all suppliers
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search || "";
    let sort = req.query.sort || "fruit_type";

    const suppliers = await Supplier.find({})
      .skip(page * limit)
      .limit(limit)
      .exec();

    res.status(200).json({ success: true, data: suppliers });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});

//GET a single supplier
router.get("/:id", getSupplier);

//POST a new supplier
router.post("/", createSupplier);

//DELETE a supplier
router.delete("/:id", deleteSupplier);

//UPDATE a supplier
router.patch("/:id", updateSupplier);

//SEARCH
router.get("/search/get", getSupplierSearch)

export default router;
