import RequestServiceModel from "../models/RequestService.js"

//this displays all the requests to the admin ONLY
//in this controller later we will add filters like services requested in last 1 month,last 3 months,last 6 months.
//Intially it will display all the services
//purpose=Admin should see all service requests.
//later=Filter by status (pending / answered) ; Filter by date (last 1 month, etc.)
export const getRequests=async (request,response)=>{
    //displays all the requested services on admin side
    try {
        const allRequests=await RequestServiceModel.find().sort({ createdAt: -1 }); //Admins usually want latest requests first.
        response.status(200).send(allRequests);
    } 
    catch (error) {
        console.log(error.message);
        response.status(500).send({"message":"Something went wrong"})
    }
}

//When user requests a service Then this controller will work and a new service request will be added in the database
//purpose=When a customer submits the Request Service form.
export const postRequest=async (request,response)=>{
    //first we will OTP verification and then this controller will come into action for submitting request
    //add APIs for OTP later
    try{
        //we would already have done OTP verification SO NO NEED TO CHECK WHETHER USER HAVE ENTERED THE MOBILE NUMBER OR NOT
        let {name,phone,serviceType,propertyType}=request.body;
        if(!name || !phone || !serviceType){
            return response.status(400).send({"message":"Please enter all the valid details like name,phone,Service type",
                "success":false,
                "result":null
            })
        }

        //if user enters all valid data and otp verification is done We will submit the request for the same
        const newRequest=await RequestServiceModel.create({name,phone,serviceType,propertyType});
        response.status(201).send({"message":"Request created successfully",
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

//When the admin has viewed or responded to a request i.e status change
//ONLY for admin
export const updateRequest=async (request,response)=>{
    let {id}=request.params;

    try{
        if(!id){
            return response.status(400).send({
                "message":"Request ID is required",
                "success":false,
                "result":null
            })
        }

        const r=await RequestServiceModel.findByIdAndUpdate(id,request.body,{
            returnDocument: "after",
            runValidators:true
        })

        if(!r){
            //if request is not found
            return  response.status(404).send({
                message: "Request not found",
                success: false,
                "result":null
            });
        }

        response.status(200).send({
            message: "Request updated successfully",
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
