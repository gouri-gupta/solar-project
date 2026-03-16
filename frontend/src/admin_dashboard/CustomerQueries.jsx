import {useEffect,useState} from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'

const CustomerQueries = () => {
  let [queries,setQueries]=useState([])
    let [editingID,setEditingID]=useState(null)  //editingId = "65fd9d3a..." MEANS only that row is editable

  //filter by status -> pending,in-progress,resolved
    let [status,setStatus]=useState("All")
    
    let [statusState,setStatusState]=useState("")


  async function getData(){
    try {
      const t=localStorage.getItem("token");
      const k=await axios.get("http://localhost:5000/api/customer-queries",{
          headers:{
            Authorization:`Bearer ${t}`
          }
        })
      let {data}=k;
      setQueries(data)
    } 
    catch (error) {
      console.log(error.message)
      if(error.status==500){
        toast.error("Failed to load customer queries")
      }
    }
  }

  useEffect(()=>{
    getData()
  },[])

  if(queries.length==0){
    return(
      <h1>There are no customer queries at present</h1>
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
        let k=await axios.patch(`http://localhost:5000/api/customer-queries/${item._id}`,obj,{
          headers:{
            Authorization:`Bearer ${t}`
          }
        })
        let {data}=k;
        console.log(data)
        toast.success("Query updated successfully")
        let updatedQueries=queries.map(q =>
          q._id === item._id
            ? { ...q, status: statusState }
            : q
        )
        setQueries(updatedQueries)
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


  let filteredQueries=queries
  if(status!="All"){
    filteredQueries=filteredQueries.filter((item)=>item.status==status)
  }

  return (
    <div>
      <h1>This displays all the customer queries</h1>

      {/*Filter by status */}
      <h3>Filter by status</h3>
      <select name="status" id="" onChange={handleStatusChange}>
        <option value="All">All</option>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="resolved">Resolved</option>
      </select>

      {
        filteredQueries.map((item)=>{
          return(
            <div key={item._id}>
              <h1>Customer name : {item.name}</h1>
              <h1>Phone : {item.phone}</h1>
              <h1>Query : {item.queryType}</h1>
              <h3>Description : {item.description}</h3>
              <h3>Status : {item.status}</h3>
              <label htmlFor="">Status</label>
              <select name="statusState" value={editingID === item._id? statusState : item.status} id="" disabled={editingID !== item._id} onChange={handleStatusStateChange}>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
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

export default CustomerQueries

// filter by  status ["pending","in-progress","resolved"]