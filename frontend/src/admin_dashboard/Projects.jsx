import {useState,useEffect} from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

const Projects = () => {

  let [projects,setProjects]=useState([])
  let [edit,setEdit]=useState(false) //to edit the status of a project

  async function getallProjects(){
    //this function fetches all the projects completed by the admin
    try {
        const t=localStorage.getItem("token");
        let k=await axios.get("http://localhost:5000/api/projects",{
          headers:{
            Authorization:`Bearer ${t}`
          }
        })
        let {data}=k;
        setProjects(data);
    } 
    catch (error) {
      console.log(error.message)
      toast.error("Something went wrong!Failed to fetch projects")
    }
  }

  useEffect(()=>{
    getallProjects();
  },[])

  return (
    <main>
      <h1>This section shows all the solar projects whose installation has been completed</h1>

      {
        projects.map((item)=>{
          return(
            <div key={item._id}>
              <h3>Name :{item.customerName}</h3>
              <h3>Phone : {item.phone}</h3>
              {
                item.email!=null && (
                  <h3>Email : {item.email}</h3>
                )
              }
              <p>Address : {item.address}</p>
              <h3>Service : {item.serviceType}</h3>
              <h3>Property: {item.propertyType}</h3>
              <h4>Installed Capacity (kW) : {item.installedCapacityKW}</h4>
              <h4>Installation Date : {item.installationDate}</h4>
              <h3>Payment Status </h3>
              <h4>Payment Mode : {item.payment.paymentMode}</h4>
              <h4>Total Cost : {item.payment.totalCost}</h4>
              <h4>Amount Paid : {item.payment.amountPaid}</h4>
              <h4>Payment Status : {item.payment.paymentStatus}</h4>
              <button>Edit</button>
              <hr />
            </div>
          )
        })
      }

    </main>
  )
}

export default Projects

//Add ons 
//Edit button for each project so that the admin can edit the status or other details of a project
//Filter by service type -> ["rooftop", "panel", "inverter"]
//Filter by property type -> ["residential", "commercial"]
//Filter by payment status -> ["paid", "partial", "pending"]
//Search bar where admin can search by customer name


