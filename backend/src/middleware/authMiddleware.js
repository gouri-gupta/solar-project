import jwt from "jsonwebtoken"
//This middleware’s job is simple:Allow request only if valid JWT token is provided.

/*
🧠 What Middleware Must Do (Conceptually)

For every protected request:

1️⃣ Read token from headers
2️⃣ Check if token exists
3️⃣ Verify token using jwt.verify()
4️⃣ If valid → attach decoded data to request
5️⃣ Call next()
6️⃣ If invalid → return 401

That’s it.
*/
const authMiddleware=(request,response,next)=>{
    try {
        //Extract authorisation header
    let k=request.headers.authorization; //this gives something like Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

    //Check if header exists
    if(!k){
        return response.status(401).send({"message":"Unauthorized"})
    }

    //Authorization header format is "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    let t=k.split(" ") //gives ["Bearer", "TOKEN"]

    if(t[0]!="Bearer"){
        return response.status(401).send({"message":"Unauthorized"}) 
    }

    let token=t[1];  //actual token

    //Verify token
    let decodedData=jwt.verify(token,process.env.JWT_SECRET)
    /*
    jwt.verify()=This function:Checks signature,Checks expiry
    If invalid → throws error
    If valid → returns decoded payload
    */

    //Attach Decoded Data To Request
        //attach this to request -> So inside controller you can access request.admin.id
        request.admin=decodedData;
        next() //passes control to actual route controller
    
    } 
    catch (error) {
        console.log(error.message)
        return response.status(401).send({"message":"Unauthorized"})
    }
}

/*
FINAL MIDDLEWARE FLOW

Check header
   ↓
Extract token
   ↓
Verify token
   ↓
If valid → attach to request → next()
If invalid → 401
*/

export default authMiddleware;