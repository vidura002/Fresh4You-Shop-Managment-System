import Orders from "../models/OrderModel.js";
import mongoose from "mongoose";

//get all orders
export const getOrders = async (req, res) => {
  const orders = await Orders.find({}).sort({ cheatedAt: -1 });

  res.status(200).json(orders);
};

//get a single order
export const getOrder = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such order" });
  }

  const order = await Orders.findById(id);

  if (!order) {
    return res.status(404).json({ error: "No such order" });
  }

  res.status(200).json(order);
};

//create new order
export const createOrder = async (req, res) => {
  const { OrderID, CustomerID, Items, Address, Price } = req.body;

  //add dot to batabase
  try {
    const order = await Orders.create({
      OrderID,
      CustomerID,
      Items,
      Address,
      Price,
    });

    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete order
export const deleteOrder = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such order" });
  }

  const order = await Orders.findOneAndDelete({ _id: id });

  if (!order) {
    return res.status(400).json({ error: "No such order" });
  }

  res.status(200).json(order);
};

//update order details
export const updateOrder = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such order" });
  }
  const order = await Orders.findByIdAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  if (!order) {
    return res.status(400).json({ error: "No such order" });
  }
  res.status(200).json(order);
};
