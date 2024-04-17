import Supplier from "../models/supplierModel.js";
import mongoose from "mongoose";

//get all suppliers
export const getSuppliers = async (req, res) => {
  const suppliers = await Supplier.find({}).sort({ createdAt: -1 });

  res.status(200).json(suppliers);
};

//get a single supplier
export const getSupplier = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such supplier" });
  }

  const supplier = await Supplier.findById(id);

  if (!supplier) {
    return res.status(404).json({ error: "No such supplier" });
  }

  res.status(200).json(supplier);
};

//create new supplier
export const createSupplier = async (req, res) => {
  const { name, contact_number, fruit_type } = req.body;

  let emptyFields = []

  if(!name) {
    emptyFields.push('name')
  }
  if(!contact_number) {
    emptyFields.push('contact_number')
  }
  if(!fruit_type) {
    emptyFields.push('fruit_type')
  }
  if(emptyFields.length > 0) {
    return res.status(400).json({error: 'Please fill in all the fields', emptyFields })
  }

  //add doc to db
  try {
    const supplier = await Supplier.create({
      name,
      contact_number,
      fruit_type,
    });
    res.status(200).json(supplier);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete a supplier
export const deleteSupplier = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such supplier" });
  }

  const supplier = await Supplier.findOneAndDelete({ _id: id });

  if (!supplier) {
    return res.status(400).json({ error: "No such supplier" });
  }

  res.status(200).json(supplier);
};
//update a supplier
export const updateSupplier = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such supplier" });
  }

  const supplier = await Supplier.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!supplier) {
    return res.status(400).json({ error: "No such supplier" });
  }

  res.status(200).json(supplier);
};

//search
export const getSupplierSearch = async (req, res,next) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = parseInt(req.query.startIndex) || 0;

    const searchTerm = req.query.searchTerm || "";

    const sort = req.query.sort || "createdAt";

    const order = req.query.order || "desc";

    const  suppliers = await Supplier.find({
      fruit_type: { $regex: searchTerm, $options: "i"},
    })

    .sort({ [sort]: order })
    .skip(startIndex)
    .limit(limit);

    return res.status(200).json(suppliers);
  } catch (error) {
    next(error);
  }
  };

