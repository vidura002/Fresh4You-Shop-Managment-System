import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/user.router.js";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import listingRouter from "./routes/listing.route.js";
import offerRoute from "./routes/OfferRoute.js";
import bodyParser from 'body-parser';
import StockRouter from './routes/Stock-Route.js'


dotenv.config();

const app = express();

app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!')
  })

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());


app.listen(3000, () => {
  console.log("server is running port 3000");
});
app.use("/api/Offer", offerRoute);
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
