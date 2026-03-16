import {useEffect,useState} from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';

const RequestedSiteVisits = () => {

  let [sites,setSites]=useState([])

    let [editingID,setEditingID]=useState(null)  //editingId = "65fd9d3a..." MEANS only that row is editable

  //filter by status -> pending,visited
    let [status,setStatus]=useState("All")

    let [statusState,setStatusState]=useState("")

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
        let k=await axios.patch(`http://localhost:5000/api/site-visits/${item._id}`,obj,{
          headers:{
            Authorization:`Bearer ${t}`
          }
        })
        let {data}=k;
        console.log(data)
        toast.success("Query updated successfully")
        let updatedSites=sites.map(site =>
          site._id === item._id
            ? { ...site, status: statusState }
            : site
        )
        setSites(updatedSites)
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

  let filteredSites=sites
  if(status!="All"){
    filteredSites=filteredSites.filter((item)=>item.status==status)
  }

  return (
     <div>
      <h1>This shows all the site visits requested by various people </h1>

      {/*Filter by status */}
      <h3>Filter by status</h3>
      <select name="status" id="" onChange={handleStatusChange}>
        <option value="All">All</option>
        <option value="pending">Pending</option>
        <option value="visited">Visited</option>
      </select>

      {
        filteredSites.map((item)=>{
          return(
            <div key={item._id}>
              <h1>Name : {item.name}</h1>
              <h1>Phone : {item.phone}</h1>
              <h2>Address : {item.address}</h2>
              {/**<h2>Status : {item.status}</h2> */}
              <label htmlFor="">Status</label>
              <select name="statusState" value={editingID === item._id? statusState : item.status} id="" disabled={editingID !== item._id} onChange={handleStatusStateChange}>
                <option value="pending">Pending</option>
                <option value="visited">Visited</option>
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

export default RequestedSiteVisits

//filter by status ["pending","visited"]