import { sendOTP,verifyOTP } from "../controllers/otpController.js";
import express from 'express'

const router=express.Router()

router.post("/send",sendOTP)

router.post("/verify",verifyOTP)

export default router;

//final API endpoints for API
// POST /api/otp/send
// POST /api/otp/verify





