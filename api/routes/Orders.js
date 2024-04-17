import express from "express";

import {
  createOrder,
  getOrders,
  getOrder,
  deleteOrder,
  updateOrder,
  getUserOrder,
} from "../controllers/OrderController.js";
import { verifyToken } from "../utils/verifyUser.js";

import { generatePdf } from "../controllers/ReceiptController.js";

const router = express.Router();

// get all orders
router.get("/", getOrders);

//get a single order
router.get("/:id", getOrder);

//POST a new order
router.post("/", verifyToken, createOrder);

//DELETE a order
router.delete("/:id", deleteOrder);

//UPDATE a order
router.patch("/:id", updateOrder);

//GENARATE receipt
router.get("/download", generatePdf);

//GET user orders
router.get("/user-orders", getUserOrder);

export default router;
