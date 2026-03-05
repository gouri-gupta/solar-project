import {useEffect,useState} from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';

const RequestedSiteVisits = () => {

  let [sites,setSites]=useState([])

  async function getData(){
    try {
      const t=localStorage.getItem("token");
        let k=await axios.get("http://localhost:5000/api/site-visits",{
          headers:{
            Authorization:`Bearer ${t}`
          }
        })
        let {data}=k;
        setSites(data)
    } 
    catch (error) {
      console.log(error.message)
      toast.error("Something went wrong!Failed to fetch requested site visits")
    }
  }

  useEffect(()=>{
    getData()
  },[])

  if(sites.length==0){
    return(
      <h1>No requested site visits at present</h1>
    )
  }

  return (
     <div>
      <h1>This shows all the site visits requested by various people </h1>

      {
        sites.map((item)=>{
          return(
            <div key={item._id}>
              <h1>Name : {item.name}</h1>
              <h1>Phone : {item.phone}</h1>
              <h2>Address : {item.address}</h2>
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

export default RequestedSiteVisits

//filter by status ["pending","visited"]