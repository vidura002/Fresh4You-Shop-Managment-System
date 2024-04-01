import express from "express";
import Offer from "../models/offers.model.js";

const route = express.Router();

route.get("/", (req, res) => {
  res.json({ message: "Hello from offers route 1" });
});

route.get("/:id", (req, res) => {
  res.json({ message: "get a single offer item" });
});

// Route for creating a new offer with image upload
route.post("/", async (req, res) => {
  const {
    OfferID,
    OfferName,
    Category,
    Price,
    Variants,
    Quantity,
    description,
  } = req.body;
  try {
    // Check if req.file exists before accessing its properties
    const newOffer = await Offer.create({
      OfferID,
      OfferName,
      Image: imageData,
      Category,
      Price,
      Variants,
      Quantity,
      description,
    });
    res.status(201).json(newOffer);
  } catch (error) {
    res.status(500).json({ error: "Error creating offer" });
  }
});

route.patch("/:id", (req, res) => {
  res.json({ message: "Update offer" });
});

route.delete("/:id", (req, res) => {
  res.json({ message: "delete offer" });
});

export default route;
