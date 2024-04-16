import express from "express";
import { createOffer,GetOneOffer,GetAllOffers,DeleteOffer} from "../controllers/OfferController.js";

const router = express.Router();

router.post("/create", createOffer);

router.get("/GetAllOffers", GetAllOffers);

router.get("/:id", GetOneOffer);

router.delete('/Delete/:id', DeleteOffer);

export default router;
