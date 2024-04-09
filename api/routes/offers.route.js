import express from "express";
import Offer from "../models/offers.model.js";

const route = express.Router();

route.get("/", (req, res) => {
  res.json({ message: "Hello from offers route 1" });
});

route.get("/:id", (req, res) => {
  res.json({ message: "get a single offer item" });
});
const create = (req, res) => {
  res.json({ message: "Create offer" });
};

route.post("/CreateOffer", create);

route.patch("/:id", (req, res) => {
  res.json({ message: "Update offer" });
});

route.delete("/:id", (req, res) => {
  res.json({ message: "delete offer" });
});

export default route;



