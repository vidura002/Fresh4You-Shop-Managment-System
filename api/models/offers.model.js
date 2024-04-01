import mongoose from "mongoose";

const offerSchema = new mongoose.Schema({
  OfferID: {
    type: Number,
    required: true,
    unique: true,
  },
  OfferName: {
    type: String,
    required: true,
  },
  Image: {
    type: String,
  },
  Category: {
    type: String,
    required: true,
  },
  Price: {
    type: Number,
    required: true,
  },
  Variants: {
    type: String,
    required: true,
  },
  Quantity: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
});

export default mongoose.model("Offer", offerSchema);
