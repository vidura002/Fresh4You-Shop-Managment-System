import mongoose from "mongoose";

const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    CustomerID: {
      type: String,
      required: true,
    },
    Items: {
      type: String,
      required: true,
    },
    Address: {
      type: String,
      required: true,
    },
    Price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Orders = mongoose.model("Order", orderSchema);

export default Orders;
