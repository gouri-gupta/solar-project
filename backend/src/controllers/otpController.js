import OTPModel from '../models/OTP.js'


export const sendOTP=async (request,response)=>{
    try {
        //request body will contain the phone number
      let {phone}=request.body;

      if(!phone){
        return response.status(400).send({
                "message":"Please enter valid phone number",
                success:false,
                result:null
            })
      }

      //OTP cooldown
      const existingOTP = await OTPModel.findOne({ phone: phone })

    if (existingOTP) {
        const currentTime = Date.now()
        const otpCreatedTime = new Date(existingOTP.createdAt).getTime()

        const diff = (currentTime - otpCreatedTime) / 1000   // difference in seconds

        if (diff < 30) {
            return response.status(429).send({
                message: "Please wait before requesting another OTP",
                success: false,
                result: null
            })
        }

        // delete old OTP if cooldown passed
        await OTPModel.deleteOne({ phone: phone })
    }

      //Generate OTP
      const otp=Math.floor(100000 + Math.random() * 900000) //this creates a number

      //Store OTP in database
      let newObj={phone:phone,otp:String(otp)}
      const createOTP=await OTPModel.create(newObj)

      //Send OTP in SMS (Fast2SMS)  LATER 
      // FIRST TEST OTP LOCALLY  
      response.status(201).send({
            "message":"OTP sent successfully",
            success:true,
            result:createOTP
        })

        //Response Should Not Return OTP in Production
        /*This is fine for local testing, which you are doing.
      But later you must remove OTP from response.
      Otherwise anyone inspecting network requests can see OTP.
      For testing this is okay. */
      /*But later when you integrate SMS you should return something like:
    result: { phone }
    Never expose OTP in production responses.*/
    } 
    catch (error) {
      console.log(error.message)
      response.status(500).send({
            "message":"Server error",
            success:false,
            result:null
        })
    }
}

/*
1️⃣ Validate phone number
2️⃣ Delete previous OTP
3️⃣ Generate OTP
4️⃣ Store OTP in DB
5️⃣ Send SMS (Fast2SMS / other provider)

⚡ Small Tip (Will Save You Time)

Before integrating SMS service:

First test OTP locally.

Just return OTP in response:

response.send({ otp: generatedOTP })

Test full flow first.

Then integrate SMS.

This prevents debugging headaches.
*/

/*
sendOTP
  ↓
generate OTP
  ↓
store OTP
  ↓
send SMS
*/

/*
User requests OTP
↓
Delete previous OTP
↓
Generate new OTP
↓
Save new OTP
*/

export const verifyOTP=async (request,response)=>{ 
    try {
      //request body will contain phone number and OTP both
      let {phone,otp}=request.body

      if(!phone || !otp){
        return response.status(400).send({
                "message":"Please enter valid phone number and otp",
                success:false,
                result:null
            })
      }

      //find otp by phone
      let findotp=await OTPModel.findOne({phone:phone});

      //When OTP Document Doesn't Exist
      if(!findotp){
        return response.status(400).send({
          "message": "OTP expired or not found. Please request a new OTP.",
          "success": false,
          "result": null
        })
      }

      //compare otp
      if(findotp.otp==otp){
        //otp verification successfull

        //delete document
        const k=await OTPModel.deleteOne({phone:phone})

        return response.status(200).send({
          "message":"OTP verified successfully",
          "success":true,
          result:findotp  //In production you should not return OTP data.but for now its fine during testing
        })
      }
      else{
        //otp no verified
        return response.status(400).send({
          "message":"Invalid OTP! OTP verification failed",
          "success":false,
          result:null
        })
      }
    } 
    catch (error) {
      console.log(error.message)
      response.status(500).send({
            "message":"Server error",
            success:false,
            result:null
        })  
    }
}

/*
verifyOTP
  ↓
find OTP by phone
  ↓
compare OTP
  ↓
delete document / mark verified
*/


/*
🧠 About Hashing OTP

You asked a very good question.

Should OTP be hashed?
Large production systems
Yes.

Companies like:
Google
Amazon
Banking apps
store:hashed OTP

Flow:
generate OTP
↓
hash OTP
↓
store hash
↓
user enters OTP
↓
hash entered OTP
↓
compare hashes

Reason:
If database leaks, attackers cannot see OTP.

For Your Project
You can keep OTP as plain text.

Reasons:
OTP expires in 5 minutes
TTL deletes it automatically
Database access is already restricted
Simpler code
Perfectly acceptable for small apps
Even many startups do this.

So your decision to keep it simple is correct.

*/

/*
Problem:OTP Spam Attack
An attacker could run a script like:

for (i = 0; i < 1000; i++) {
   sendOTP("9422918612")
}

Result:
User receives 1000 OTP messages

Problems:
SMS provider cost increases
User gets spammed
Server load increases
Potential abuse

So production apps add OTP cooldown.

Solution: OTP Cooldown

After sending OTP, user must wait 30 seconds before requesting another OTP.

Example flow:
User requests OTP
        ↓
  OTP sent
        ↓
User cannot request new OTP for 30 seconds

This prevents spam.

⚙️ Cooldown Logic

Inside sendOTP:

find existing OTP
        ↓
check createdAt
        ↓
if less than 30 seconds
        ↓
reject request

Conceptually:
currentTime - createdAt < 30 seconds
Then return error.
*/


