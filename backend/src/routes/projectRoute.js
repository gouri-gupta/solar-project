import express from "express";
import { getProjects,addProject,updateProject,getPublicProjects } from "../controllers/projectController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router=express.Router()

/*
🧠 What is express.Router()?

Router() allows you to:
Split your routes into separate files
Keep code modular
Avoid writing everything in server.js

Router acts like a mini express app
*/

//to access all the projects completed by the business
//Admin only -> protected route
router.get("/",authMiddleware,getProjects);

//public route -> to display images on wall of trust
router.get("/public",getPublicProjects)

//Admin route
//to add a new project completed by the business
router.post("/",authMiddleware,addProject);

//Admin only
//to update the details of an exisiting project with :id 
router.patch("/:id",authMiddleware, updateProject);

export default router

/*
server.js = Main Highway
routes files = Side roads
controllers = Work done at destination
*/

/*
🌐 All Important HTTP Methods (And When To Use Them)
✅ 1️⃣ GET
Purpose → Fetch / Read data

Used when:
Get all projects
Get one project
Get site visits
Get analytics

Example:
router.get("/", getProjects);

GET should:
NOT modify data
NOT create data
Only retrieve

✅ 2️⃣ POST
Purpose → Create new resource

Used when:
Add project
Submit service request
Submit site visit
Login admin

Example:
router.post("/", addProject);

POST:
Creates new document
Sends data in request body

✅ 3️⃣ PUT
Purpose → Replace entire resource

PUT means:
Replace the whole document

PUT expects full object again.
If you omit a field → it may be removed.

Use PUT when:
You want to overwrite entire document.

✅ 4️⃣ PATCH
Purpose → Partial update

PATCH means:
Update only specific fields

Example:
Update paymentStatus
Update amountPaid
Change status from pending → answered

✅ 5️⃣ DELETE
Purpose → Remove resource
*/


/*
❌ NEVER Make Full /api/projects Public

Your projects collection contains:
customerName
phone
email
payment details
installation date
images

If you make:
router.get("/", getProjects);

public…

Then anyone can call:
GET /api/projects

And see:
All customer phone numbers
Emails
Payment data

🚨 This is a serious privacy issue.

✅ Correct Professional Solution

You need TWO separate APIs.

🟢 1️⃣ Public Route (For Wall of Trust)

This should return ONLY:
images
maybe capacity
maybe propertyType
maybe serviceType

NOT:
phone
email
payment
full address

Example route:
router.get("/public", getPublicProjects);

Inside controller:
ProjectModel.find({}, "images installedCapacityKW propertyType serviceType")

Notice:
Second parameter selects only specific fields.

🔐 2️⃣ Admin Route (Protected)
router.get("/", protect, getProjects);
This returns FULL document.

Because admin is authenticated.
*/

/*
🧠 Real-World Example

Think of Amazon:

Product listing page → public

Seller dashboard → protected

Same database.
Different APIs.
Different data exposure.
*/