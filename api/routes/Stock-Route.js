import express from "express"
import { CreateStock, GetAllStock, GetOneStock, UpdateStock, DeleteStock ,UpdateQuantity } from "../controllers/Stock-Controller.js";

const router = express.Router();

router.post("/createstock", CreateStock);

router.get("/getAll", GetAllStock);

router.get("/:id", GetOneStock);

router.put('/Update/:id', UpdateStock);

router.put("/updateQuantity", UpdateQuantity)

router.delete('/Delete/:id', DeleteStock);


export default  router;