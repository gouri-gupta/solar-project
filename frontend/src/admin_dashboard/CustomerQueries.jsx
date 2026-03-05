import {useEffect,useState} from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'

const CustomerQueries = () => {
  let [queries,setQueries]=useState([])


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

  return (
    <div>
      <h1>This displays all the customer queries</h1>

      {
        queries.map((item)=>{
          return(
            <div key={item._id}>
              <h1>Customer name : {item.name}</h1>
              <h1>Phone : {item.phone}</h1>
              <h1>Query : {item.queryType}</h1>
              <h3>Descritpion : {item.description}</h3>
              <h3>Status : {item.status}</h3>
              <button>Edit</button>
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