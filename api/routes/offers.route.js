import express from "express";
import multer from "multer"; // Import multer for file uploads
import { create } from "../controllers/offers.controller.js";
import Offer from "../models/offers.model.js";
import path from "path";

const route = express.Router();

// Multer configuration for file uploads
const storage = multer.memoryStorage(); // Store uploaded files in memory
const upload = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../src/images/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() ;
    cb(null, `${uniqueSuffix}_${file.originalname}`);
  },
}); // Configure multer with the storage options

route.get("/", (req, res) => {
  res.json({ message: "Hello from offers route 1" });
});

route.get("/:id", (req, res) => {
  res.json({ message: "get a single offer item" });
});

// Route for creating a new offer with image upload
route.post("/", upload.single("file") , async (req, res) => {
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
    const imageData = req.file ? req.file.buffer : undefined;
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
