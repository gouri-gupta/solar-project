import ProjectModel from "../models/Project.js";

//the below fetches all the projects completed by the company
//displays the images in wall of trust
//we will refactor the logic So that admin can use this to view all projects,filter projects by propertyType,filter projects by date
//Admin only
export const getProjects=async (request,response)=>{
    try{
        const projectData=await ProjectModel.find().sort({installationDate:-1})
        //Sort the projects according to Installation date as Admin usually wants to see latest projects first
        response.status(200).send(projectData);
    }
    catch(error){
        response.status(500).send({"message":"Something went wrong"});
    }
}

//This return ONLY:images,maybe capacity ,maybe propertyType ,maybe serviceType
//NOT:phone,email,payment,full address
//public route
export const getPublicProjects=async (request,response)=>{
    try{
        const d=await ProjectModel.find({},{images:1,installationDate:1,installedCapacityKW:1,propertyType:1,serviceType:1,_id:1}).sort({installationDate:-1}).exec()
         //Sort the projects according to Installation date as public usually wants to see latest projects first
        //console.log(d);
        response.status(200).send(d)
    }
    catch(error){
        response.status(500).send({"message":"Something went wrong"});
    }
}

//it enables us to add the details of a new project
//Only Admin should use this.
export const addProject=async (request,response)=>{
    try{
        console.log(request.body);
        let {customerName,phone,serviceType,propertyType,installedCapacityKW}=request.body;
        let payment = request.body.payment || {};
        let {paymentMode,totalCost}=payment;
        if(!customerName || !phone || !serviceType || !propertyType || !installedCapacityKW || !paymentMode){
            response.status(400).send({
                "message":"Please enter all the required details",
                success:false,
                "result":null
            })
            return ;
        }
        const result=await ProjectModel.create(request.body);
        response.status(201).send({
            "message":"Data saved",
            success:true,
            "result":result
        })
    }
    catch(error){
        response.status(500).send({
            "message":"Something went wrong",
            success:false,
            "result":null
        })
    }
}

//this enables us to update the details of an existing project
//i.e may be payment status if payment is compelted and all
//Admin only
export const updateProject = async (request, response) => {
  try {
    const { id } = request.params;

    // Check if ID is provided
    if (!id) {
      return response.status(400).send({
        message: "Project ID is required",
        success: false,
      });
    }

    // Find project and update
    const updatedProject = await ProjectModel.findByIdAndUpdate(id,request.body,
      {
        returnDocument: "after",        // return updated document
        runValidators: true, // apply schema validation
      }
    );

    // If project not found
    if (!updatedProject) {
      return response.status(404).send({
        message: "Project not found",
        success: false,
        "result":null
      });
    }

    response.status(200).send({
      message: "Project updated successfully",
      success: true,
      result: updatedProject,
    });

  } catch (error) {
    response.status(500).send({
      message: "Something went wrong",
      success: false,
      "result":null
    });
  }
};

//All the above 3 are accessible only to Admin
//Later since I will be creating filter in Admin side SO I will add some more controllers like get all the residential projects OR commercial projects
//Get all the projetc completed in the year 2025
//Get all the projects completed last month Means in admin side I will create a filter like year -month to get the projects completed in that duration
//BUT NOW I want to keep it simple
//Because I still havent worked on Admin waala frontend part First I will complete all the user side and then go to the Admin features 

/*
🚀 Professional Way (Single GET API + Query Filters)

Instead of 10 controllers, we use:

GET /api/projects?propertyType=residential
GET /api/projects?year=2025
GET /api/projects?month=02
GET /api/projects?propertyType=commercial&year=2025

That means:

You only keep:

export const getProjects = async (req, res) => {}

Inside that controller, you check:

req.query.propertyType
req.query.year
req.query.month

This is scalable and clean.

So your thinking about filters is good —
just implement it smartly later.
*/

//Purpose of each controller

/*
1️⃣ getProjects()

Purpose:

Fetch all completed projects

Later apply filters (propertyType, year, etc.)

Used in:
Wall of Trust (public)
Admin Dashboard (protected)

So later you might have:
Public route → only completed projects
Admin route → all projects

But keep it simple for now.
*/


/*
STATUS CODES
| Code | Meaning      | Situation                 |  Action                             |
| ---- | ------------ | ------------------------- |---------------------------------    |
| 200  | Success      | Data fetched correctly    |  Get data,Update data,Delete data   |
| 201  | Created      | New data inserted         |  Create data                        |
| 400  | Bad Request  | User sent wrong data      |  Invalid Input                      |
| 401  | Unauthorized | Not logged in             |  Authorisation required             |
| 403  | Forbidden    | Logged in but not allowed |  
| 404  | Not Found    | Resource does not exist   |  Not found                          |
| 500  | Server Error | Backend crashed           |  Server crash                       |

🎯 Why status codes are important?
Frontend depends on status codes.

Example:
if(response.status === 401){
   redirectToLogin()
}

Without status codes, frontend cannot differentiate:
Success
Validation error
Server crash


How To Use Status Codes?
res.status(200).json(data)
res.status(200).send(data)
*/


/*
Difference Between res.send() and res.json()

🔹 res.send()
It is generic.
It can send:
String
Object
HTML
Buffer

If you send object, Express automatically converts it to JSON.

So this:
res.send(projectData)
Internally becomes JSON anyway.

🔹 res.json()
Specifically meant for sending JSON.

It:
Automatically converts object to JSON
Sets Content-Type: application/json


🎯 So Which One To Use?
For APIs → prefer:res.json()

Because:
It clearly tells: “This is JSON API”
Cleaner professional practice
Standard in production APIs
*/

