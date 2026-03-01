import express from "express"
import { createAdmin,loginAdmin } from "../controllers/adminController.js"

const router=express.Router();

// Create admin (used manually via Postman only)
//Only backend should create admin
router.post("/create", createAdmin);

// Login admin
//public route
router.post("/login", loginAdmin);

//Only backend should delete admin
//router.delete("/:id",deleteAdmin)

export default router;

/*
🧠 What Is JWT?

JWT = JSON Web Token

It is NOT password encryption.

It is NOT password hashing.

It is a signed authentication token.
*/

/*
🔑 JWT

Used to:

Identify logged-in user in future requests

Flow:

1️⃣ Admin logs in
2️⃣ Backend verifies password
3️⃣ Backend generates JWT token
4️⃣ Sends token to frontend

Example token:
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

5️⃣ Frontend stores token (localStorage or memory)
6️⃣ On every protected request:

Authorization: Bearer <token>

7️⃣ Backend middleware verifies token

If valid → allow access
If invalid → reject
*/

/*

🧠 Full Admin Flow In Your Project

1️⃣ Admin enters email + password
2️⃣ loginAdmin controller:
    find admin
    compare password
    generate JWT
3️⃣ Send token to frontend
4️⃣ Frontend stores token
5️⃣ For protected APIs:
    Send token in headers
6️⃣ Middleware verifies token
7️⃣ Allow or block
*/