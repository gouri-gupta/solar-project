import { createCustomerQuery,getAllCustomerQueries,updateCustomerQuery } from "../controllers/customerQueryController.js";
import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

const router=express.Router();

//Admin only
router.get("/",authMiddleware,getAllCustomerQueries)

//public
router.post("/",createCustomerQuery);

//Admin only
router.patch("/:id",authMiddleware,updateCustomerQuery)

export default router;

//Later protect all Admin routes -> use authorisation middlewares in routes
/*
🔐 1️⃣ Should Admin Routes Be Protected?

YES. Absolutely.

Anything like:
View all projects
View all requests
Update project
Change status
View analytics

👉 MUST be protected.

Otherwise:

Anyone can open Postman and call:
GET /api/projects

And see all your business data.

That is dangerous.

🚫 If You Don't Protect Them
Even if frontend hides buttons…
Anyone can directly call backend API.

Frontend protection ≠ backend protection.

Backend must enforce security.

✅ How Do We Protect Admin Routes?
Using:
👉 JWT + Authorisation Middleware

Flow will be:
Login → Get Token → Send Token in Header → Middleware verifies → Allow access
*/