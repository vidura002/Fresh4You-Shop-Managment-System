<<<<<<< HEAD
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import userRouter from "./routes/user.router.js";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import listingRouter from "./routes/listing.route.js";
import offerroute from "./routes/offers.route.js";
=======
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.router.js'
import authRouter from './routes/auth.route.js'
import cookieParser from 'cookie-parser';
import listingRouter from './routes/listing.route.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import StockRouter from './routes/Stock-Route.js'
>>>>>>> main



dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
dotenv.config();

<<<<<<< HEAD
app.get("/", (req, res) => {
  res.send("Hello World!");
});
=======
app.use(cors());
app.get('/', (req, res) => {
    res.send('Hello World!')
  })
>>>>>>> main

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());



app.listen(3000, () => {
  console.log("server is running port 3000");
});
app.use("/api/Offer", offerroute);
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);
app.use("/api/Stock", StockRouter);

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoBD!");
  })
  .catch((err) => {
    console.log(err);
  });

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
