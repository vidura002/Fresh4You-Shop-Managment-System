import FruitStock from "../models/Stock-Model.js";

//Create new stock
const CreateStock = async (req, res) => {
  try {
    const { FruitID, FruitName, FruitQuantity, price, image } = req.body;

    const existingStock = await FruitStock.findOne({ FruitID });
    if (existingStock) {
      return res.status(400).json({ error: "FruitID already exists" });
    }

    const newStock = new FruitStock({
      FruitID,
      FruitName,
      FruitQuantity,
      price,
      image,
    });
    await newStock.save();
    res.status(200).json({
      success: true,
      Massage: "Fruit Item Created Successfully",
      newStock,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ success: false, Massage: "Fruit Item not Created Successfully" });
  }
};

const GetAllStock = async (req, res) => {
  try {
    const stock = await FruitStock.find();
    res.status(200).json({ success: true, data: stock });
  } catch (error) {
    console.error("Error fetching stock data:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }

  
};

const GetOneStock = async (req, res) => {
  const { id } = req.params; // Extract ID from request parameters
  try {
    const stockItem = await FruitStock.findById(id); // Find stock item by ID
    if (!stockItem) {
      return res.status(404).json({ success: false, error: "Stock item not found" });
    }
    res.status(200).json({ success: true, data: stockItem });
  } catch (error) {
    console.error("Error fetching stock item by ID:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
export { CreateStock, GetAllStock, GetOneStock };
