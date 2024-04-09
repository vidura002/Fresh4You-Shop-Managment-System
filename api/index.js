import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import userRouter from "./routes/user.router.js";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import listingRouter from "./routes/listing.route.js";
import multer from "multer";
import route from "./routes/offers.route.js";
const OfferModel = require("./models/offers.model.js");//new create offer(2024.04.05)

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });
dotenv.config();
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoBD!");
  })
  .catch((err) => {
    console.log(err);
  });
const app = express();
app.use(cors());
app.use(bodyParser.json());
dotenv.config();

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

app.post("/CreateOffer", (req, res) => {
  OfferModel.create(req.body)
  .then(offers => res.json(offers))
  .catch(err => res.json(err));
});

app.listen(3000, () => {
  console.log("server is running port 3000");
});
app.use("/api/CreateOffer", route);
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);

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
