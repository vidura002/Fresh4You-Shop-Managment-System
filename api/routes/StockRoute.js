import express from 'express';
const router = express.Router();
import { create } from '../controllers/StockController.js';


router.get('/',(req,res)=>{
    res.json({message:"Welcome to Stock API"});
})

router.get('/:id',(req,res)=> {
    res.json({massage:"Get a single Stock item"});
})

router.post('/',create);

router.patch('/:id',(req,res)=> {
    res.json({massage:"Update stock"});
})

router.delete('/:id',(req,res)=> {
    res.json({massage:"Delete stock"});
})


export  default router;



