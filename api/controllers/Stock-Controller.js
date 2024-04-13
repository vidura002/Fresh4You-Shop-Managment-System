import FruitStock from "../models/Stock-Model.js"

const CreateStock = async (req,res) =>{
    try{
    const{FruitID,FruitName,FruitQuantity,price,image} = req.body; 

    const existingStock = await FruitStock.findOne({ FruitID });
    if (existingStock) {
      return res.status(400).json({ error: 'FruitID already exists' });
    }

    const newStock = new FruitStock({
        FruitID,FruitName,FruitQuantity,price,image
    })
    await newStock.save()
    res.status(200).json({success:true,Massage:"Fruit Item Created Successfully", newStock})
    }
    catch(err){
        console.log(err);
        res.status(500).json({success:false,Massage:"Fruit Item not Created Successfully"})

    }

}

export {CreateStock}