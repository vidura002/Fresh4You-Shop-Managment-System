import mongoose from "mongoose";
import Stock from '../models/Stock.js';

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