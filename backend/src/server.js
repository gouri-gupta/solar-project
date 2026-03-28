import express from "express";
import connectDB from "./config/db.js"
import dotenv from "dotenv";
import projectRoute from "./routes/projectRoute.js"
import customerQueryRoute from "./routes/customerQueryRoute.js"
import adminRoute from "./routes/adminRoute.js"
import requestServiceRoute from "./routes/requestServiceRoute.js"
import siteVisitRoute from "./routes/siteVisitRoute.js"
import calculatorRoute from "./routes/calculatorRoute.js"
import cors from "cors"
import otpRoute from "./routes/otpRoute.js"

dotenv.config();

const app=express();
const PORT=process.env.PORT || 5000;

//console.log("MONGO_URI:", process.env.MONGO_URI);
connectDB();

//gloabl middlewares
//app.use() is commonly used in app.js to mount middleware or route modules at a specific path. 
// This allows you to organize routes into separate files and keep your main application file clean.
app.use(express.json());

//CORS
app.use(cors({
  origin: ["https://sannidhisunsolution.in", "https://www.sannidhisunsolution.in"],
  credentials: true
}));


//routes
app.get("/",(request,response)=>{
    response.send("Solar backend running")
})

//Remember to authorisation middleware to specific routes
app.use("/api/projects",projectRoute);
app.use("/api/customer-queries",customerQueryRoute)
app.use("/api/admin",adminRoute)
app.use("/api/calculator",calculatorRoute)
app.use("/api/request-services",requestServiceRoute)
app.use("/api/site-visits",siteVisitRoute)
app.use("/api/otp",otpRoute)

//app.use path + router path


//Error middleware


//start server
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
    
})




/*
1️⃣ Correct Order of Things in server.js

In Express backend, the clean and professional order is:

1. Imports
2. Load environment variables
3. Create app
4. Connect database
5. Global middlewares
6. Routes
7. Error middleware (later)
8. Start server (listen)

🔥 Why This Order?
🔹 Database connection should happen before routes
Because routes may depend on DB.

🔹 Middlewares must come BEFORE routes
Because middleware modifies request before route handles it.
*/


/*
2️⃣ Why do we use process.env ?

process.env stores environment variables.

These values:
PORT
MONGO_URI
JWT_SECRET
Cloudinary keys

should NOT be hardcoded

What is process?
Node.js global object.
process.env = object containing environment variables.

eg:console.log(process.env.PORT);
*/


//IMPORTANT
/*
🚀 When You Deploy Later (Important)

When you deploy backend to:
    Render
    Railway
    Vercel (server)
    AWS

Then you will:
    Remove 0.0.0.0/0
    Add only production server IP

But that’s later.
*/