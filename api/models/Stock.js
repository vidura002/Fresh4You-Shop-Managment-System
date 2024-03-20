const mongoose = required('mongoose');
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
    qty:{
        type:Number, 
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    image:{
        type: String,
        required: ture
    }
});

module.exports = mongoose.module( 'stock', StockSchema );
