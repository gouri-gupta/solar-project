import SiteVisitModel from "../models/SiteVisit.js"

//this displays all the site visit requests to the admin ONLY
//in this controller later we will add filters like site visits requested in last 1 month,last 3 months,last 6 months.
//Intially it will display all the services
//purpose-Admin dashboard → show all site visit requests.
//later Filter by status ,Filter by date range
export const getAllSiteVisits=async (request,response)=>{
    //displays all the requested site visits on admin side
        try {
            const allRequests=await SiteVisitModel.find().sort({ createdAt: -1 }); //Admins usually want latest requests first.
            response.status(200).send(allRequests);
        } 
        catch (error) {
            console.log(error.message);
            response.status(500).send({"message":"Something went wrong"})
        }
}

//When user requests a site visit Then this controller will work and a new service request will be added in the database
//When customer submits site visit form.
//This is PUBLIC API (no auth).
export const createSiteVisit=async (request,response)=>{
    //first we will OTP verification and then this controller will come into action for submitting request
        //add APIs for OTP later
        try{
            //we would already have done OTP verification SO NO NEED TO CHECK WHETHER USER HAVE ENTERED THE MOBILE NUMBER OR NOT
            let {name,phone,address}=request.body;
            if(!name || !phone || !address){
                return response.status(400).send({"message":"Please enter all the valid details like name,phone,Address",
                    "success":false,
                    "result":null
                })
            }
    
            //if user enters all valid data and otp verification is done We will submit the request for the same
            const newRequest=await SiteVisitModel.create({name,phone,address});
            response.status(201).send({"message":"Site Visit request created successfully",
                "success":true,
                "result":newRequest
            })
        }
        catch(error){
            console.log(error.message)
            response.status(500).send({"message":"Something went wrong",
                "success":false,
                "result":null
            })
        }
}

//When the admin has visite the site i.e status change
//ONLY for admin
export const updateSiteVisit=async (request,response)=>{
    let {id}=request.params;
    
        try{
            if(!id){
                return response.status(400).send({
                    "message":"Site Visit Request ID is required",
                    "success":false,
                    "result":null
                })
            }
    
            const r=await SiteVisitModel.findByIdAndUpdate(id,request.body,{
                returnDocument: "after",
                runValidators:true
            })
    
            if(!r){
                //if request is not found
                return  response.status(404).send({
                    message: "Site visit Request not found",
                    success: false,
                    "result":null
                });
            }
    
            response.status(200).send({
                message: "Site Visit Request updated successfully",
                success: true,
                result: r,
            });
        }
        catch(error){
            console.log(error.message);
            response.status(500).send({"message":"Something went wrong",
                "success":false,
                "result":null
            })
        }
}