import mongoose from "mongoose";
import Stock from '../models/Stock.js';


// create  new fruit
export const create = async(req,res)=> {
    const{FruitID,FruitName,quantity,price,image} = req.body;
    try{
        const stock  = await  Stock.create({
            FruitID,
            FruitName,
            quantity,
            price,
            image
        })
        res.status(201).json(stock);
    }catch(error){
        res.status(400).json("Not created");
    }
}

//get all stock details
export const getAllStock = async(req, res) => {
    const  stocks = await Stock.find({}).sort({createdAt: -1});
    res.status(200).json(stocks)
}


//get single stock data
export const getsingleStock = async(req, res) => {
    const {FruitID} = req.params

    const stock = await Stock.findById(FruitID);
    if(!stock){
        return res.status(404).json("Not Found");
    }
    res.status(200).json(stock)

}

//Update Stock
export const UpdataStock = async(req, res) => {
    const {FruitID} = req.params

    if(!mongoose.Types.ObjectId.isValid(FruitID)) 
    {return res.status(404).send("No such user Id exists")}

    const stock = await Stock.findByIdAndUpdate({_id: FruitID},{
       ...req.body 
    })

    if(!stock) {
        return res.status(400).json('Update failed')
    }
    res.status(201).json(stock)

}

//Delete Stock
export const DeleteStock = async(req,res)=>{
    const {FruitID} = req.params

    if(!mongoose.Types.ObjectId.isValid(FruitID)) 
    {return res.status(404).send("No such user Id exists")}

    const stock = await Stock.findByIdAndDelete({_id : FruitID})
    res.status(200).json(stock)

    if(!stock) {
        return res.status(400).json('Delete failed')
    }
    res.status(201).json(stock)
}



