import mongoose from "mongoose";

const offerSchema = new mongoose.Schema({
    offerID: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  variant: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  image:{
    type :String ,
    required: true
  }
});

const OfferModel = mongoose.model("Offers", offerSchema);
export default OfferModel;
