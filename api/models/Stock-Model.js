import { Mongoose } from "mongoose";

const FruitStock = new Mongoose.Schema({
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
    image:{
        type: String,
        required: true,
    },

    });
    
const Stock = Mongoose.model("FruitStock", FruitStock);
export default Stock;

