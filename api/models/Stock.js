import mongoose from 'mongoose';
const StockSchema = new mongoose.Schema({
    FruitID:{
        type: String,
        required : true,
        unique: true
    },
    FruitName:{
        type:String,
        required: true
    },
    quantity:{
        type:Number, 
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    image:{
        type: String,
        required: true
    }
});

const Stock = mongoose.model( 'Stock', StockSchema );
export default Stock;

