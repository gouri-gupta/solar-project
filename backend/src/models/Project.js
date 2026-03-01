import mongoose from "mongoose";

const projectSchema=mongoose.Schema({
    customerName:{
        type:String,
        required:[true,"Customer Name is required"]
    },
    phone:{
        type:String,
        required:[true,"Phone no is required"],
        index: true
    },
    email:{
        type:String,
        default:null
    },
    address:String,
    serviceType: {
        type: String,
        enum: ["rooftop", "panel", "inverter"],
        required: true
    },
    propertyType: {
        type: String,
        enum: ["residential", "commercial"],
        required: true
    },
    installedCapacityKW: {
        type: Number,
        required: true
    },
    installationDate:Date,
    images: {
        type: [String],
        default: []
    },
    payment: {
        paymentMode: {
            type: String,
            enum: ["full", "loan"],
            required: true
        },
        totalCost: {
            type: Number,
            required: true
        },
        amountPaid: {
            type: Number,
            default: 0
        },
        paymentStatus: {
            type: String,
            enum: ["paid", "partial", "pending"],
            default: "pending"
        }
    }
},
{
    timestamps:true
})

const ProjectModel=mongoose.model("projects",projectSchema)
export default ProjectModel;

/*
images: [String],

That means:
It stores an array
Each element is a string
Each string will be a Cloudinary URL
*/


/*
Your current schema:

One document = One installation project

That is actually correct design.

You do NOT need to redesign into:
One person → array of projects

Because:

In real business,

Each installation has:
Different address
Different capacity
Different date
Different payment
Different images

So 1 project = 1 document is clean.
*/

