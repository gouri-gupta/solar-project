import mongoose from "mongoose";

const request_servicesSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is required"]
    },
    phone:{
        type:String,
        required:[true,"Phone number is required"]
    },
    serviceType:{
        type:String
    },
    propertyType:{
        type:String
    },
    status:{
        type:String,
        enum:["pending","answered"],
        default:"pending"
    }
},
{
    timestamps:true
})

const RequestServiceModel=mongoose.model("request_services",request_servicesSchema)
export default RequestServiceModel;

//Here "request_services" → Model name (NOT directly collection name)
//Mongoose automatically converts model name to collection name

//Here RequestService is the Model used to interact with the collection
//You NEVER directly talk to collection.You always talk through:Model
//Model → connects to → collection

//Schema → Defines structure
//Model → Used to interact with DB
//Collection → Where documents are stored

/*
When you write:

{
   timestamps: true
}

Mongoose automatically adds two fields to every document:
createdAt: Date
updatedAt: Date
*/