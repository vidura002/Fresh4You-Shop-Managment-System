import OfferModel from "../models/OfferModel.js";

const createOffer = async (req, res) => {
  try {
    const { offerID, name, price, variant, quantity, description, image } = req.body;

    const existingOffer = await OfferModel.findOne({ offerID });
    if (existingOffer) {
      return res.status(400).json({ error: "Offer ID already exists" });
    }

    const newOffer = new OfferModel({
      offerID,
      name,
      price,
      variant,
      quantity,
      description,
      image,
    });
    await newOffer.save();
    res.status(200).json({
      success: true,
      message: "Offer Item Created Successfully",
      newOffer,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating offer" });
  }
};

export { createOffer };
