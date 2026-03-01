import mongoose from "mongoose";

const adminSchema=mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
},
{
    timestamps:true
})

const AdminModel=mongoose.model("admins",adminSchema)
export default AdminModel;

/*
JWT-based authentication

Admin enters email + password
You find admin by email
Compare hashed password using bcrypt
If correct → generate JWT token
Send token to frontend
Protect admin routes using JWT middleware
*/

//When you hash a password using bcrypt ->it just becomes a long string

/*
This schema does NOT encrypt anything automatically.

Encryption happens in:

👉 Controller
👉 Before saving to DB
👉 Using bcrypt

Schema only defines structure.
*/