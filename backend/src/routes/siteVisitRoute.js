import express from "express"
import { getAllSiteVisits,createSiteVisit,updateSiteVisit } from "../controllers/siteVisitController.js"
import authMiddleware from "../middleware/authMiddleware.js";

const router=express.Router();

//Admin only
router.get("/",authMiddleware,getAllSiteVisits);

//public router
router.post("/",createSiteVisit)

//Admin only
router.patch("/:id",authMiddleware,updateSiteVisit)

export default router;