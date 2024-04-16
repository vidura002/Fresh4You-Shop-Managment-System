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

const GetAllOffers = async (req, res) => {
  try {
    const stock = await OfferModel.find();
    res.status(200).json({ success: true, data: stock });
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }

  
};

const GetOneOffer = async (req, res) => {
  const { id } = req.params;
  try {
    const stockItem = await OfferModel.findById(id);
    if (!stockItem) {
      return res.status(404).json({ success: false, error: "Stock item not found" });
    }
    res.status(200).json({ success: true, data: stockItem });
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

const DeleteOffer = async (req, res) => {
  try {
      const fruit = await OfferModel.findByIdAndDelete(req.params.id);
      if (!fruit) {
          return res.status(404).json({ error: 'Fruit not found' });
      }
      res.json({ message: 'Fruit deleted successfully' });
  } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
  }
};
export { createOffer,GetAllOffers,GetOneOffer, DeleteOffer };