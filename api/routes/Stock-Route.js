import express from "express"
import { CreateStock, GetAllStock, GetOneStock } from "../controllers/Stock-Controller.js";

const router = express.Router();

router.post("/createstock", CreateStock);

router.get("/getAll", GetAllStock);

router.get("/:id", GetOneStock);

export default  router;