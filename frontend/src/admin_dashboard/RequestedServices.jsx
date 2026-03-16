import {useState,useEffect} from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'

const RequestedServices = () => {
  let [services,setServices]=useState([])
  let [editingID,setEditingID]=useState(null)  //editingId = "65fd9d3a..." MEANS only that row is editable
  
  //filter by status -> pending,answered
  let [status,setStatus]=useState("All")

  let [statusState,setStatusState]=useState("")
  

  async function getData(){
    try {
      const t=localStorage.getItem("token");
        let k=await axios.get("http://localhost:5000/api/request-services",{
          headers:{
            Authorization:`Bearer ${t}`
          }
        })
        let {data}=k;
        setServices(data)
    } 
    catch (error) {
      console.log(error.message)
      toast.error("Something went wrong!Failed to fetch queries")
    }
  }

  useEffect(()=>{
    getData()
  },[])


  if(services.length==0){
    return(
      <h1>No requested services at present</h1>
    )
  }

  

  let handleStatusChange=(e)=>{
    setStatus(e.target.value)
  }

  let handleStatusStateChange=(e)=>{
    setStatusState(e.target.value)
  }

  let saveChanges=async (item)=>{
    try {
      let obj = {
        ...item,
        status: statusState
      }
      //send updated query to backend
      const t=localStorage.getItem("token");
        let k=await axios.patch(`http://localhost:5000/api/request-services/${item._id}`,obj,{
          headers:{
            Authorization:`Bearer ${t}`
          }
        })
        let {data}=k;
        console.log(data)
        toast.success("Query updated successfully")
        let updatedServices=services.map(service =>
          service._id === item._id
            ? { ...service, status: statusState }
            : service
        )
        setServices(updatedServices)
        setEditingID(null)

    } catch (error) {
      console.log(error)
      toast.error("Failed to update query status ! Try again...")
    }
    //call backend API
    //save the updates 
  }

  let handleEditQuery=(item)=>{
    setEditingID(item._id)
    setStatusState(item.status)
  }

  let filteredServices=services
  if(status!="All"){
    filteredServices=filteredServices.filter((item)=>item.status==status)
  }

  

  return (
    <div>
      <h1>This shows all the services requested by various people </h1>

      {/*Filter by status */}
      <h3>Filter by status</h3>
      <select name="status" id="" onChange={handleStatusChange}>
        <option value="All">All</option>
        <option value="pending">Pending</option>
        <option value="answered">Answered</option>
      </select>

      {
        filteredServices.map((item)=>{
          return(
            <div key={item._id}>
              <h1>Name : {item.name}</h1>
              <h1>Phone : {item.phone}</h1>
              <h2>Property Type : {item.propertyType}</h2>
              <h2> Service Type : {item.serviceType}</h2>
              {/**<h2>Status : {item.status}</h2> */}
              <label htmlFor="">Status</label>
              <select name="statusState" value={editingID === item._id? statusState : item.status} id="" disabled={editingID !== item._id} onChange={handleStatusStateChange}>
                <option value="pending">Pending</option>
                <option value="answered">Answered</option>
              </select>
              <br />
      
              {
                editingID==item._id ? <button onClick={()=>saveChanges(item)}>Save</button> : <button onClick={()=>handleEditQuery(item)}>Edit</button>
              }
              <hr />
            </div>
          )
        })
      }
    </div>
  )
}

export default RequestedServices

//filter by status -> ["pending","answered"]