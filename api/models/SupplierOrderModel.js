import mongoose from "mongoose";

const SupplierOrderModelSchema = new mongoose.Schema({
    fruit: String,
    qty: String,
    date: String,
    supplier_id: String,
    status: String
})

const SupplierOrderModels = mongoose.model("supplierorders", SupplierOrderModelSchema)


export default SupplierOrderModels;

