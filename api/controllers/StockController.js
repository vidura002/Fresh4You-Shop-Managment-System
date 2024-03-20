import mongoose from "mongoose";
import Stock from '../models/Stock.js';

//get all stock details
const getAllStock = async(req, res) => {
    const  stocks = await Stock.find({}).sort({createdAt: -1});
    res.status(200).json(stock)
}

const getsingleStock = async(req, res) => {
    const {FruitID} = 
}




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