import express from "express"
import { saveCalculatorAnalytics,getAllCalculatorAnalytics } from "../controllers/calculatorController.js"
import authMiddleware from "../middleware/authMiddleware.js";

const router=express.Router();

//Admin only
router.get("/",authMiddleware,getAllCalculatorAnalytics)

//public route
router.post("/",saveCalculatorAnalytics)

export default router;