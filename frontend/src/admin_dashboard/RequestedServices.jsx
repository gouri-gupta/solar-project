import {useState,useEffect} from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
import { GrStatusGoodSmall } from "react-icons/gr";


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
    <main className=' m-8 flex flex-col'> {/**border border-black */}
      
      <section className=' flex flex-row justify-between'> {/**border border-blue-700 */}
        <div>
          <h1 className="text-[#003366] text-xl font-bold p-2">This shows all the services requested by various people </h1>
        </div>

        {/*Filter by status */}
        <div>
          <h3 className='text-[#333333] text-lg font-normal'>Filter by status</h3>
          <select name="status" id="" onChange={handleStatusChange}>
            <option value="All">All</option>
            <option value="pending">Pending</option>
            <option value="answered">Answered</option>
          </select> 
        </div>
      </section>

      <div className='overflow-x-auto'>
          <div className="min-w-[900px]">
                {/**Header */}
            <section className=' grid  grid-cols-6 font-semibold p-2 bg-gray-100'> {/**border border-purple-800 */}
                <h1>Name</h1>
                <h1>Phone</h1>
                <h1>Property Type</h1>
                <h1>Service Type</h1>
                <h1>Status</h1>
                <h1></h1>
            </section>

            {/**Rows */}
            <section className=''> {/**border border-red-900 */}
                {
                filteredServices.map((item)=>{
                  return(   
                    <div key={item._id} className=' grid  grid-cols-6 gap-2 items-center border-b p-2 even:bg-gray-50'> {/**border border-green-800 */} 
                      <h1>{item.name}</h1>
                      <h1>{item.phone}</h1>
                      <h2>{item.propertyType}</h2>
                      <h2>{item.serviceType}</h2>
                      {/**<h2>Status : {item.status}</h2> */}
                      
                      <div className="flex items-center gap-2">
                        {
                          item.status=="pending" ? <span className='text-yellow-500 inline-block'><GrStatusGoodSmall></GrStatusGoodSmall></span> : <span className='text-green-600 inline-block'><GrStatusGoodSmall></GrStatusGoodSmall></span>
                      }
                      <select name="statusState" value={editingID === item._id? statusState : item.status} id="" disabled={editingID !== item._id} onChange={handleStatusStateChange}>
                        <option value="pending">Pending</option>
                        <option value="answered">Answered</option>
                      </select>
                      </div>
              
                      {
                        editingID==item._id ? <button onClick={()=>saveChanges(item)} className="w-fit px-4 py-1 items-center bg-green-200 rounded-xl text-green-800 font-bold shadow-md hover:bg-green-300 hover:text-white border border-transparent hover:border-white transition">Save</button> : <button onClick={()=>handleEditQuery(item)} className="w-fit px-4 py-1 items-center bg-gray-200 rounded-xl text-gray-800 font-bold shadow-md hover:bg-gray-300 hover:text-white border border-transparent hover:border-white transition">Edit</button>
                      }
                      
                    </div>
                  )
                })
              }
            </section>
        </div>
      </div>
    </main>
  )
}

export default RequestedServices

//filter by status -> ["pending","answered"]