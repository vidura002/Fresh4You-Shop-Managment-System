import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.router.js'
import authRouter from './routes/auth.route.js'
import cookieParser from 'cookie-parser';
import listingRouter from './routes/listing.route.js';
import bodyParser from 'body-parser';
import cors from 'cors';


dotenv.config();

const app = express();
app.use(cors());

app.use(express.json());
app.use(cookieParser());

app.use(bodyParser.json());

//schema
const schemaData = mongoose.Schema({
    deliveryId: Number,
    orderId: String,
    name: String,
    method: String,
    status: String
},{
    timestamps: true
})


const deliveryModel = mongoose.model("delivery2", schemaData)

//read
app.get('/', async(req, res) => {
    const data = await deliveryModel.find({})
    res.json({success : true, data : data})
  })

//create data
app.post("/create", async(req,res)=>{
    console.log(req.body)
    const data = new deliveryModel(req.body)
    await data.save()
    res.send({success : true, message : "data saved successfully", data : data})
})

//update data
app.put("/update",async(req,res)=>{
    console.log(req.body)
    const {id,...rest} = req.body
    console.log(rest)
    const data =await deliveryModel.updateOne({_id : id}, rest)
    res.send({success : true, message : "data updated successfully", data : data})
    
})

//delete
app.delete("/delete/:id", async(req,res)=>{
    const id = req.params.id
    console.log(id)
    const data = await deliveryModel.deleteOne({_id : id})
    res.send({success : true, message : "data deleted successfully", data : data})
})


  mongoose.connect(process.env.MONGO).then(() => {
    console.log('Connected to MongoBD!');
    app.listen(3000, () => {
        console.log('server is running port 3000');
     }
    );
  }).catch((err) => {
        console.log(err);
    })

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);

app.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success : false,
        statusCode,
        message,
    });
});
