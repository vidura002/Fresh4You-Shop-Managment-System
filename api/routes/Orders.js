import express from "express";

import {
  createOrder,
  getOrders,
  getOrder,
  deleteOrder,
  updateOrder,
} from "../controllers/OrderController.js";

import { generatePdf } from "../controllers/ReceiptController.js";

const router = express.Router();

// get all orders
router.get("/", getOrders);

//get a single order
router.get("/:id", getOrder);

//POST a new order
router.post("/", createOrder);

//DELETE a order
router.delete("/:id", deleteOrder);

//UPDATE a order
router.patch("/:id", updateOrder);

//GENARATE receipt
router.get("/download", generatePdf);

export default router;
