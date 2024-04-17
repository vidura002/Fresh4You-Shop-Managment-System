import express from "express";
import { createOffer,GetOneOffer,GetAllOffers,DeleteOffer,UpdateOffer} from "../controllers/OfferController.js";

const router = express.Router();

router.post("/create", createOffer);// create off route

router.get("/GetAllOffers", GetAllOffers);// Get all offer route

router.get("/:id", GetOneOffer); // Get one offer route

router.delete('/Delete/:id', DeleteOffer); // Delete offer route

router.put('/Update/:id', UpdateOffer);

export default router;
