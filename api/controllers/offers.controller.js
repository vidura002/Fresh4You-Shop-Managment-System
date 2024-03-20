import Offer from "../models/offers.model.js";

export const create = async (req, res) => {
  try {
    const offersData = new Offer(req.body);
    if(!offersData) {
      return res.status(404).json({ message: "Offer data not found" });
    }
    const savedData = await offersData.save();
    res.status(201).json(savedData);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}