import FruitStock from "../models/Stock-Model.js";

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
    console.error("Error", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }

  
};

const GetOneStock = async (req, res) => {
  const { id } = req.params;
  try {
    const stockItem = await FruitStock.findById(id);
    if (!stockItem) {
      return res.status(404).json({ success: false, error: "Stock item not found" });
    }
    res.status(200).json({ success: true, data: stockItem });
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

const UpdateStock = async (req, res) => {
  const { id } = req.params; 
  const { FruitName, FruitQuantity, price,category, image } = req.body; 

  try {
    // Find the stock item by _id and update its details
    const updatedItem = await FruitStock.findByIdAndUpdate(id, {
      FruitName,
      FruitQuantity,
      price,
      image,
    }, { new: true }); // { new: true } option returns the updated document

    if (!updatedItem) {
      return res.status(404).json({ message: 'Stock item not found' });
    }

    // If update is successful, send back the updated item
    res.status(200).json(updatedItem);
  } catch (error) {
    console.error('Error updating stock item:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


const DeleteStock = async (req, res) => {
  try {
      const fruit = await FruitStock.findByIdAndDelete(req.params.id);
      if (!fruit) {
          return res.status(404).json({ error: 'Fruit not found' });
      }
      res.json({ message: 'Fruit deleted successfully' });
  } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
  }
};
export { CreateStock, GetAllStock, GetOneStock, DeleteStock, UpdateStock };


