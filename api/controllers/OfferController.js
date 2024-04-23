import OfferModel from "../models/OfferModel.js";



//create offer controller
const createOffer = async (req, res) => {
  try {
    const { offerID, name, price, variant, quantity, description, image } =
      req.body;

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

//Get All offer Controller
const GetAllOffers = async (req, res) => {
  try {
    const Offer = await OfferModel.find();
    res.status(200).json({ success: true, data: Offer });
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

//Get one offer Controller
const GetOneOffer = async (req, res) => {
  const { id } = req.params;
  try {
    const stockItem = await OfferModel.findById(id);
    if (!stockItem) {
      return res
        .status(404)
        .json({ success: false, error: "Offer item not found" });
    }
    res.status(200).json({ success: true, data: stockItem });
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

//Delete offer Controller
const DeleteOffer = async (req, res) => {
  try {
    const fruit = await OfferModel.findByIdAndDelete(req.params.id);
    if (!fruit) {
      return res.status(404).json({ error: "Offer not found" });
    }
    res.json({ message: "Offer deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const UpdateOffer = async (req, res) => {
  const { id } = req.params; 
  const { offerID, name, price, variant, quantity, description, image } =
  req.body;
  try {
    const updatedItem = await OfferModel.findByIdAndUpdate(id, {
      offerID, name, price, variant, quantity, description, image ,
    }, { new: true }); 
    if (!updatedItem){
      return res.status(404).json({ message: 'offer item not found' });
    }
    res.status(200).json(updatedItem);
  } catch (error) {
    console.error('Error updating offer item:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
export { createOffer, GetAllOffers, GetOneOffer, DeleteOffer,UpdateOffer };


