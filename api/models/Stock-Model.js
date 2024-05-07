import mongoose from "mongoose";

const { Schema } = mongoose;

const FruitStockSchema = new Schema({
    FruitID:{
        type:String,
        required:true,
        unique:true
    },
    FruitName:{
        type:String,
        required: true
    },
    FruitQuantity:{
        type: Number,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    category:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
});

const Stock = mongoose.model("FruitStock", FruitStockSchema);
export default Stock;