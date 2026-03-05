import {useState,useEffect} from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'

const RequestedServices = () => {
  let [services,setServices]=useState([])

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


  return (
    <div>
      <h1>This shows all the services requested by various people </h1>

      {
        services.map((item)=>{
          return(
            <div key={item._id}>
              <h1>Name : {item.name}</h1>
              <h1>Phone : {item.phone}</h1>
              <h2>Property Type : {item.propertyType}</h2>
              <h2> Service Type : {item.serviceType}</h2>
              <h2>Status : {item.status}</h2>
              <button>Edit</button>
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