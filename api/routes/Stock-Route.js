import express from "express"
import { CreateStock } from "../controllers/Stock-Controller.js";

const router = express.Router();

router.post("/stock", CreateStock);

export default  router;