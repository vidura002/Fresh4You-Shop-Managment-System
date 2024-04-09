import Offer from "../models/offers.model.js";

export const create = async (req, res) => {
  const { id, name, price, variant, quantity, category, description,image } =
    req.body;
  try {
    // Check if req.file exists before accessing its properties
    const newOffer = await Offer.create({
      id,
      name,
      price,
      variant,
      quantity,
      category,
      description,
    });
    res.status(201).json(newOffer);
  } catch (error) {
    res.status(500).json({ error: "Error creating offer" });
  }
};

