import FruitStock from "../models/Stock-Model.js";

import fs from 'fs';

const fileName = 'lastGeneratedNumber.txt'; 

let lastGeneratedNumber = 9999;

try {
  if (fs.existsSync(fileName)) {
    const data = fs.readFileSync(fileName, 'utf8');
    lastGeneratedNumber = parseInt(data);
  } else {
    saveLastGeneratedNumberToFile(); 
  }
} catch (err) {
  console.error("Error reading last generated number from file:", err);
}

function generateFruitID() {
  lastGeneratedNumber++;
  saveLastGeneratedNumberToFile();
  return 'F' + lastGeneratedNumber.toString(); 
}

function saveLastGeneratedNumberToFile() {
  try {
    fs.writeFileSync(fileName, lastGeneratedNumber.toString());
  } catch (err) {
    console.error("Error saving last generated number to file:", err);
  }
}

const CreateStock = async (req, res) => {
  try {
    const {FruitName, FruitQuantity, price,category, image } = req.body;
    const FruitID = generateFruitID();
    const existingStock = await FruitStock.findOne({ FruitID });

    if (existingStock) {
      return res.status(400).json({ error: "FruitID already exists" });
    }
    const newStock = new FruitStock({
      FruitID,
      FruitName,
      FruitQuantity,
      price,
      category,
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

  if (!id) {
    return res.status(400).json({ success: false, error: "No ID provided" });
  }

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
    const updatedItem = await FruitStock.findByIdAndUpdate(id, {
      FruitName,
      FruitQuantity,
      price,
      category,
      image,
    }, { new: true }); 

    if (!updatedItem) {
      return res.status(404).json({ message: 'Stock item not found' });
    }
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


const UpdateQuantity = async (req, res) => {
  const { id, quantity } = req.body;

  try {
    const stockItem = await FruitStock.findById(id);

    if (!stockItem) {
      return res.status(404).json({ message: "Stock item not found" });
    }

    stockItem.FruitQuantity -= quantity;

    await stockItem.save();

    res.status(200).json({ message: "Stock quantity updated successfully" });
  } catch (error) {
    console.error("Error updating stock quantity:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { CreateStock, GetAllStock, GetOneStock, DeleteStock, UpdateStock, UpdateQuantity };


