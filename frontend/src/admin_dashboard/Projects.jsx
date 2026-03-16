import {useState,useEffect} from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { IoSearch } from "react-icons/io5";

const Projects = () => {

  let [projects,setProjects]=useState([])
  let [edit,setEdit]=useState(false) //to edit the status of a project
  let [name,setName]=useState("") //this state controls the function of searching by customer name

  //Filter by service type -> ["rooftop", "panel", "inverter"]
  let [service,setService]=useState("All")

  //Filter by property type -> ["residential", "commercial"]
  let [property,setProperty]=useState("All")

  //Filter by payment status -> ["paid", "partial", "pending"]
  let [status,setStatus]=useState("All")

  const [editingProject, setEditingProject] = useState(null)
  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    email: "",
    address: "",
    serviceType: "",
    propertyType: "",
    installedCapacityKW: "",
    installationDate: "",
    paymentMode: "",
    totalCost: "",
    amountPaid: "",
    paymentStatus: ""
  })
  

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

  let  handlePropertyChange=(e)=>{
    setProperty(e.target.value)
  }

  let handleSeviceChange=(e)=>{
    setService(e.target.value)
  }

  let handleStatusChange=(e)=>{
    setStatus(e.target.value)
  }
  
  let handleSearchBar=(e)=>{
    setName(e.target.value)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }


  useEffect(()=>{
    getallProjects();
  },[])

  let filteredProjects=projects
  if(property!=="All"){
    filteredProjects=filteredProjects.filter((item)=> item.propertyType==property)
    //console.log(filteredProjects)
  }

  if(service!="All"){
    filteredProjects=filteredProjects.filter((item)=>item.serviceType==service)
  }

  if(status!="All"){
    filteredProjects=filteredProjects.filter((item)=>item.payment.paymentStatus==status)
  }

  if(name!=""){
    filteredProjects=filteredProjects.filter((item)=>item.customerName.toLowerCase().includes(name.toLowerCase()))
  }

  const openEditModal = (project) => {
      setEditingProject(project)

      setFormData({
        customerName: project.customerName,
        phone: project.phone,
        email: project.email || "",
        address: project.address,
        serviceType: project.serviceType,
        propertyType: project.propertyType,
        installedCapacityKW: project.installedCapacityKW,
        installationDate: project.installationDate.split("T")[0],
        paymentMode: project.payment.paymentMode,
        totalCost: project.payment.totalCost,
        amountPaid: project.payment.amountPaid,
        paymentStatus: project.payment.paymentStatus
      })
    }

    const saveChanges = async () => {
      try {
        const token = localStorage.getItem("token")

        const updatedProject = {
          ...editingProject,
          customerName: formData.customerName,
          phone: formData.phone,
          email: formData.email,
          address: formData.address,
          serviceType: formData.serviceType,
          propertyType: formData.propertyType,
          installedCapacityKW: formData.installedCapacityKW,
          installationDate: formData.installationDate,
          payment: {
            paymentMode: formData.paymentMode,
            totalCost: formData.totalCost,
            amountPaid: formData.amountPaid,
            paymentStatus: formData.paymentStatus
          }
        }

        await axios.patch(
          `http://localhost:5000/api/projects/${editingProject._id}`,
          updatedProject,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        )

        const updatedProjects = projects.map(p =>
          p._id === editingProject._id ? updatedProject : p
        )

        setProjects(updatedProjects)
        setEditingProject(null)

        toast.success("Project updated successfully")

      } catch (error) {
        console.log(error)
        toast.error("Failed to update project")
      }
    }

  

  

  const display=(projects)=>{
    return projects.map((item)=>{
          const mongoDateString = item.installationDate
          const dateObject = new Date(mongoDateString)
          const installDate = `${dateObject.getDate()}-${dateObject.getMonth() + 1}-${dateObject.getFullYear()}`
          
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
              <h4>Installation Date : {installDate}</h4>
              <h3>Payment Status </h3>
              <h4>Payment Mode : {item.payment.paymentMode}</h4>
              <h4>Total Cost : {item.payment.totalCost}</h4>
              <h4>Amount Paid : {item.payment.amountPaid}</h4>
              <h4>Payment Status : {item.payment.paymentStatus}</h4>
              <button onClick={() => openEditModal(item)}>Edit</button>
              <hr />
            </div>
          )
        })
      }
      

  return (
    <main>
      <input type="text" placeholder='Search by customer name' value={name} onChange={handleSearchBar}/> <IoSearch />

      {/*Filter by propertyType */}
      <h3>Filter by property</h3>
      <select name="property" id="" onChange={handlePropertyChange}>
        <option value="All">All</option>
        <option value="residential">Residential</option>
        <option value="commercial">Commercial</option>
      </select>

      {/*Filter by serviceType */}
      <h3>Filter by service</h3>
      <select name="service" id="" onChange={handleSeviceChange}>
        <option value="All">All</option>
        <option value="rooftop">Rooftop</option>
        <option value="panel">Panel</option>
        <option value="inverter">Inverter</option>
      </select>

      {/*Filter by paymentStatus */}
      <h3>Filter by payment status</h3>
      <select name="status" id="" onChange={handleStatusChange}>
        <option value="All">All</option>
        <option value="paid">Paid</option>
        <option value="partial">Partial</option>
        <option value="pending">Pending</option>
      </select>


      <h1>This section shows all the solar projects whose installation has been completed</h1>
      
      {display(filteredProjects)}
      
      {editingProject && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">

    <div className="bg-white p-6 rounded-lg w-[800px] max-h-[120vh] overflow-y-auto">

      <h2 className="text-xl font-bold mb-4">Edit Project</h2>

      <section>
        <label htmlFor="">Customer Name : </label>
        <input
          name="customerName"
          value={formData.customerName}
          onChange={handleChange}
          placeholder="Customer Name"
        />
      </section>

      <section>
        <label htmlFor="">Phone : </label>
        <input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone"
        />
      </section>

      <section>
        <label htmlFor="">Email : </label>
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />
      </section>

      <section>
        <label htmlFor="">Address : </label>
        <input
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Address"
        />
      </section>

      <section>
        <label htmlFor="">Service : </label>
        <select name="serviceType" value={formData.serviceType} onChange={handleChange}>
          <option value="rooftop">Rooftop</option>
          <option value="panel">Panel</option>
          <option value="inverter">Inverter</option>
        </select>
      </section>

      <section>
        <label htmlFor="">Property : </label>
        <select name="propertyType" value={formData.propertyType} onChange={handleChange}>
          <option value="residential">Residential</option>
          <option value="commercial">Commercial</option>
        </select>
      </section>

      <section>
        <label htmlFor="">Installed Capacity(kW) : </label>
        <input
          name="installedCapacityKW"
          value={formData.installedCapacityKW}
          onChange={handleChange}
          placeholder="Installed Capacity"
        />
      </section>

      <section>
        <label htmlFor="">Installation Date : </label>
        <input
          type="date"
          name="installationDate"
          value={formData.installationDate}
          onChange={handleChange}
        />
      </section>

      <section>
        <label htmlFor="">Payment mode : </label>
        <select name="paymentMode" value={formData.paymentMode} onChange={handleChange}>
          <option value="full">Full</option>
          <option value="loan">Loan</option>
        </select>
      </section>

      <section>
        <label htmlFor="">Total Cost : </label>
        <input
          name="totalCost"
          value={formData.totalCost}
          onChange={handleChange}
          placeholder="Total Cost"
        />
      </section>

      <section>
        <label htmlFor="">Amount Paid : </label>
        <input
          name="amountPaid"
          value={formData.amountPaid}
          onChange={handleChange}
          placeholder="Amount Paid"
        />  
      </section>

      <section>
        <label htmlFor="">Payment status : </label>
        <select name="paymentStatus" value={formData.paymentStatus} onChange={handleChange}>
          <option value="paid">Paid</option>
          <option value="partial">Partial</option>
          <option value="pending">Pending</option>
        </select>   
      </section>

      <div className="flex gap-3 mt-4">
        <button onClick={saveChanges}>Save</button>
        <button onClick={() => setEditingProject(null)}>Cancel</button>
      </div>

    </div>

  </div>
)}

    </main>
  )
}

export default Projects

//Add ons 
//Edit button for each project so that the admin can edit the status or other details of a project

//Search bar where admin can search by customer name


