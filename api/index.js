import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.router.js'
import authRouter from './routes/auth.route.js'
import cookieParser from 'cookie-parser';
import listingRouter from './routes/listing.route.js';
import bodyParser from 'body-parser';



dotenv.config();

mongoose.connect(process.env.MONGO).then(() => {
    console.log('Connected to MongoBD!');
    }).catch((err) => {
        console.log(err);
    })


const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!')
  })

app.use(express.json());
app.use(cookieParser());

app.use(bodyParser.json());

app.listen(3000, () => {
    console.log('server is running port 3000');
 }
);

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
