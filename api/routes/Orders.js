import express from "express";

import {
  createOrder,
  getOrders,
  getOrder,
  deleteOrder,
  updateOrder,
} from "../controllers/OrderController.js";

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

export default router;
