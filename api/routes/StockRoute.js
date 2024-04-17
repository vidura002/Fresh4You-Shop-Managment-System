import express from "express";
const router = express.Router();
import {
  create,
  getAllStock,
  getsingleStock,
} from "../controllers/StockController.js";

router.get("/", getAllStock);

router.get("/:FruitID", getsingleStock);

router.post("/", create);

router.patch("/:id", (req, res) => {
  res.json({ massage: "Update stock" });
});

router.delete("/:id", (req, res) => {
  res.json({ massage: "Delete stock" });
});

export default router;
