import mongoose from "mongoose";

const Schema = mongoose.Schema;

const supplierSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    contact_number: {
      type: Number,
      required: true,
    },
    fruit_type: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Suplier = mongoose.model("Supplier", supplierSchema);

export default Suplier;
