import supplierRoutes from "./routes/suppliers.js";
import SupplierOrderModels from "./models/SupplierOrderModel.js";

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
app.use(express.json());
app.use(cookieParser());

app.get("/supplier_orders", async (req, res) => {
  SupplierOrderModels.find({})
    .then((supplierorders) => res.json(supplierorders))
    .catch((err) => res.json(err));
});

app.get("/getSupplierOrder/:id", async (req, res) => {
  const id = req.params.id;
  SupplierOrderModels.findById({ _id: id })
    .then((supplierorders) => res.json(supplierorders))
    .catch((err) => res.json(err));
});

app.put("/updateOrder/:id", async (req, res) => {
  const id = req.params.id;
  SupplierOrderModels.findByIdAndUpdate(
    { _id: id },
    {
      fruit: req.body.fruit,
      qty: req.body.qty,
      date: req.body.date,
      supplier_id: req.body.supplier_id,
      status: req.body.status,
    }
  )
    .then((supplierorders) => res.json(supplierorders))
    .catch((err) => res.json(err));
});

app.delete("/supplier_orders/deleteUser/:id", (req, res) => {
  const id = req.params.id;
  SupplierOrderModels.findByIdAndDelete({ _id: id })
    .then((res) => res.json(res))
    .catch((err) => res.json(err));
});

app.post("/createOrder", async (req, res) => {
  SupplierOrderModels.create(req.body)
    .then((supplierorders) => res.json(supplierorders))
    .catch((err) => res.json(err));
});
app.get('/', (req, res) => {
    res.send('Hello World!')
  })

app.use(express.json());
app.use(cookieParser());

app.use(bodyParser.json());

app.listen(3000, () => {
  console.log("server is running port 3000");
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);
app.use("/api/Suppliers", supplierRoutes);
app.use("/api/Stock", StockRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
