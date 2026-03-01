import AdminModel from "../models/Admin.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

//this controller is used to create a new admin
//In frontend we have only 1 option i.e Login as Admin
//So whenever any new admin is there we will do it through backend only I have purposely kept it like this because if we keep options like Sign in as Admin then there will be multiple admins i.e everyone can become Admin I dont want to do that
/*
✔ Only backend can create admin
✔ No public signup
✔ Only login option in frontend
*/
export const createAdmin=async (request,response)=>{
    try{
        let {email,pass}=request.body;
        if(!email || !pass){
            return response.status(400).send({"message":"Please enter a valid email and password","success":false,"result":null})
        }

        if(pass.length<8){
            return response.status(400).send({"message":"Password should contain at least 8 characters","success":false,"result":null})
        }

        //Check if admin already exists . If exists → return error
        const k=await AdminModel.findOne({email:email})

        if(k!=null){
            //means an admin with given email already exisits in our admin database 
            return response.status(400).send({
                "message":"Admin already exists",
                "success":false,
                "result":null
            })
        }

        const newObj={};
        newObj.email=email;

        //hash password and then store in database
        const salt=await bcrypt.genSalt(10)
        //console.log(salt)
        const h=await bcrypt.hash(pass,salt) //returns hashed password string

        newObj.password=h;
        const newAdmin=await AdminModel.create(newObj);
        response.status(201).send({
            "message":"Admin created successfully",
            success:true,
            result:{email:newAdmin.email,_id:newAdmin._id}
        })
    }
    catch(error){
        console.log(error.message)
        response.status(500).send({"message":"Something went wrong","success":false,"result":null})
    }
}

/*
Generate a Salt

bcrypt works using something called salt.

Salt = random string added to password before hashing.

Why?
Because if two admins use the same password:
Their hashed passwords will still be different.
This prevents rainbow table attacks.

You will:

👉 Generate salt
👉 Choose salt rounds (usually 10)

Salt rounds = how strong the hashing is
10 is standard and safe.

Generate hashed password using plain password and salt.
*/





//this controller checks whether the entered login credentials matches with any one of the admin or not
/*
🔥 Complete Login Flow Summary

1️⃣ User sends email + password
2️⃣ Backend finds admin
3️⃣ Compare password
4️⃣ If correct → generate JWT using jwt.sign()
5️⃣ Send token
6️⃣ Frontend stores token
7️⃣ Future requests include token
8️⃣ Backend verifies using jwt.verify()
*/
export const loginAdmin=async (request,response)=>{
    try {
       const {e,p}=request.body;
       //e=email ; p=password

       if(!e || !p){
        return response.status(400).send({"message":"Please enter a valid email and password","success":false})
       }

       const isEmail=await AdminModel.findOne({email:e})

       if(isEmail==null){
        //means no such email exists in our admin database
        return response.status(401).send({"message":"Invalid credentials","success":false})
       }

       const isPassMatch=await bcrypt.compare(p,isEmail.password);

       if(isPassMatch==false){
        //means incorrect password match i.e Entered password is incorrect
        return response.status(401).send({"message":"Invalid credentials","success":false})
       }

       //means email exists in our database and correct password is enetered -> here comes JWT
       //Generate Token After Password Match

        const payload={};
        payload.id=isEmail._id;
        payload.email=isEmail.email;
        const token=jwt.sign(payload,process.env.JWT_SECRET,{ expiresIn: "1d" })
       
       response.status(200).send({"message":"Logged in successfully",
        "success":true,
        "token":token
       })

    } 
    catch (error) {
        console.log(error.message)
        response.status(500).send({"message":"Something went wrong","success":false})
    }
}

/*
What JWT will do?
1️⃣ Generate a token
2️⃣ Send token to frontend
3️⃣ Frontend stores token
4️⃣ For every protected request → frontend sends token
5️⃣ Backend verifies token
6️⃣ If valid → allow access
7️⃣ If invalid → reject
*/

/*
🔐 jwt.sign() Takes 3 Things:

1️⃣ Payload
2️⃣ Secret key
3️⃣ Options (like expiry time)

🔹 1. Payload
Payload is the data you want to store inside token.
For admin login, keep it minimal:
admin id
email
role (optional)
Never store password in token.

Example concept:
{
  id: admin._id,
  email: admin.email
}

🔹 2. Secret Key
You already have in .env:
JWT_SECRET=supersecretkey
This is used to sign and later verify token.

🔹 3. Expiry Option
Always set expiry.
Example concept:
"1d"
"7d"
"2h"

This makes token expire automatically.

After this Send token to frontend->Frontend stores it (usually in localStorage).
*/


/*
During Login (Important for Tomorrow)
You won’t decrypt.

You will use:
👉 bcrypt.compare()

You pass:
Entered plain password
Hashed password from DB

bcrypt.compare(enteredPassword, hashedPassword)

This returns:
true
false
*/


//this controller is used to delete an exisiting admin -> NOT REQUIRED
/*export const deleteAdmin=(request,response)=>{

}*/



