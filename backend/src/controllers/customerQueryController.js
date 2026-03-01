import CustomerQueryModel from "../models/CustomerQuery.js"
import ProjectModel from "../models/Project.js";

//When user submits the form it will create a customer query 
//inside this we will check whether is this an existing customer or not through mobile number
/*
IMPORTANT
Because here you will:

Take phone from request body
Search in projects collection
If NOT found → reject request
If found → create query
Store customerId (ObjectId from projects collection)
*/
export const createCustomerQuery=async (request,response)=>{
    try{
        //request.body will store all the necessary information
        let {name,phone}=request.body;
        if(!name || !phone){
            response.status(400).send({
                "message":"Please enter name and phone number",
                success:false,
                result:null
            })
            return ;
        }

        //find whether this phone no belongs to one of your customers or not
        const k=await ProjectModel.findOne({phone:request.body.phone})

        if(k!=null){
            //means this phone number belongs to one of our customers 
            //therefore we will create this cusotmer query
            const newQuery = {
                ...request.body,
                customerId: k._id
            };
            const savedQuery=await CustomerQueryModel.create(newQuery);
            response.status(201).send({
                "Message":"Customer Query created successfully",
                success:true,
                result:savedQuery
            })
        }
        else{
            response.status(404).send({
                "message":"Customer not found",
                success:false,
                result:null
            })
            return ;
        }
    }
    catch(error){
        response.status(500).send({
            "message":"Server error",
            success:false,
            result:null
        })
    }
}

//This will display all the queries of the customers to the Admin
//This can be viewed by Admin only
//Later we will add filters like billing,performance,maintenance indicating find all billing queries etc
export const getAllCustomerQueries=async (request,response)=>{
    try{
        const queries=await CustomerQueryModel.find();
        response.status(200).send(queries);
    }
    catch(error){
        response.status(500).send({
            "message":"Server error"
        })
    }
}

//When admin has taken action on this like status change to "in-progress" or resolved etc by ADMIN ONLY
export const updateCustomerQuery=async(request,response)=>{
    try{
        let {id}=request.params;
        //We have to update the customer query with this id

        if(!id){
            response.status(400).send({
                "message":"Invalid Customer Query ID",
                success:false,
                result:null
            })
            return;
        }

        const k=await CustomerQueryModel.findByIdAndUpdate(id,request.body,{returnDocument: "after",runValidators:true})

        if(!k){
            response.status(404).send({
                message: "Query not found",
                success: false,
                "result":null
            });
            return
        }

        response.status(200).send({
            "message":"Customer Query updated successfully",
            success:true,
            result:k
        })
    }
    catch(error){
        response.status(500).send({
            "message":"Server error",
            success:false,
            result:null
        })
    }
}