import mongoose from "mongoose"

const site_visitsSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is required"]
    },
    phone:{
        type:String,
        required:[true,"Phone number is required"]
    },
    address:{
        type:String,
        required:[true,"Address is required"]
    },
    status:{
        type:String,
        enum:["pending","visited"],
        default:"pending"
    }
},
{
    timestamps:true
})

const SiteVisitModel=mongoose.model("site_visits",site_visitsSchema)
export default SiteVisitModel;