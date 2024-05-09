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
import orderRoutes from "./routes/Orders.js";


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); // Parse JSON requests
app.use(cookieParser());
app.use(bodyParser.json()); // Parse JSON requests

// Connect to MongoDB
mongoose.connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use("/api/Offer", offerRoute);
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);
app.use("/api/Stock", StockRouter);
app.use("/api/orders", orderRoutes);

// Schema - Delivery
const schemaData = mongoose.Schema({
  name: String,
  method: String,
  status: String
}, { timestamps: true });

const deliveryModel = mongoose.model("delivery2", schemaData);

// Read Delivery
app.get('/api/delivery', async (req, res) => {
  try {
    const data = await deliveryModel.find({});
    res.json({ success: true, data: data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create data Delivery
app.post("/api/delivery/create", async (req, res) => {
  try {
    const data = new deliveryModel(req.body);
    await data.save();
    res.json({ success: true, message: "Data saved successfully", data: data });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Update data Delivery
app.put("/api/delivery/update", async (req, res) => {
  try {
    const { _id, ...rest } = req.body;
    const data = await deliveryModel.findByIdAndUpdate(_id, rest, { new: true });
    res.json({ success: true, message: "Data updated successfully", data: data });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Delete Delivery
app.delete("/api/delivery/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await deliveryModel.findByIdAndDelete(id);
    res.json({ success: true, message: "Data deleted successfully", data: data });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});
