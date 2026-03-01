import CalculatorAnalyticsModel from "../models/CalculatorAnalysis.js"

//Store calculator usage analytics -> Public route
export const saveCalculatorAnalytics=async (request,response)=>{
    try{
        //all the required fields which are needed for calculating estimated KW or savings and all is already validated in frontend So we wont be validating it here 
        //if user doesnt enter any required details needed for calculation Automatically calculator wont work OR give some warnings like Enter average monthly bill and all
        //because after the user clicks "CALCULATE" on screen the required details will be sent to backend also
        let {bill,propertyType,roofAreaProvided,estimatedKW}=request.body;
        let billRange="";

        if (typeof bill !== "number") {
            return response.status(400).send({ 
                "message":"Please enter valid bill range",
                success:false,
                result:null
            })
        }

        if(bill<2000){
            billRange="0-2000"
        }
        else if(bill>=2000 && bill<5000){
            billRange="2000-5000"
        }
        else if(bill>=5000 && bill<10000){
            billRange="5000-10000"
        }
        else if(bill>=10000 && bill<20000){
            billRange="10000-20000"
        }
        else{
            billRange="20000+"
        }
        const newObj={billRange,propertyType,roofAreaProvided,estimatedKW};
        const k=await CalculatorAnalyticsModel.create(newObj);
        response.status(201).send({
            "message":"Calculator analytics stores anonymously",
            "success":true,
            "result":k
        })
    }
    catch(error){
        console.log(error.message)
        response.status(500).send({
            "message":"Something went wrong",
            "success":false,
            result:null
        })
    }
}

//Fetch all calculator analytics -> Admin only (later protect with JWT)
export const getAllCalculatorAnalytics=async (request,response)=>{
    try{
        const d=await CalculatorAnalyticsModel.find();
        response.status(200).send(d);  //sends all the data
    }
    catch(error){
        console.log(error.message)
        response.status(500).send({"message":"Something went wrong"})
    }
}

/*
🧠 Why This Is Enough

Right now your goal is:
Track how many people use calculator
Residential vs Commercial split
Bill range distribution
Whether roof area is usually provided
Average estimatedKW

That’s it.

You don't need update/delete.

🚀 Later (When You Build Charts)

Instead of fetching raw data, you’ll create:

GET /api/calculator-analytics/stats

And use MongoDB aggregation like:
$group
$count
$avg
$sum

To directly return pie chart ready data.

But NOT now.
*/