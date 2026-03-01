import express from "express"
import { getRequests,postRequest,updateRequest } from "../controllers/requestServiceController.js"
import authMiddleware from "../middleware/authMiddleware.js";

const router=express.Router()

//admin only -> can view the services requested by various customers
router.get("/",authMiddleware,getRequests);

//public -> users can submit their requests
router.post("/",postRequest)

//admin only -> once admin has responded he can change the status of the request 
router.patch("/:id",authMiddleware,updateRequest)

export default router;


