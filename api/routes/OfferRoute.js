import express from "express";
import { createOffer } from "../controllers/OfferController.js";

const router = express.Router();

router.post("/create", createOffer);

export default router;
