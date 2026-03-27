import {useState,useEffect} from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { IoSearch } from "react-icons/io5";
import { MdAddBox } from "react-icons/md";
import { GrStatusGoodSmall } from "react-icons/gr";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
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

  const [showAddModal, setShowAddModal] = useState(false)

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
        let k=await axios.get(`${BASE_URL}/api/projects`,{
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

  {/**Filter logic */}
  let filteredProjects=projects
  if(property!=="All"){
    filteredProjects=filteredProjects.filter((item)=> item.propertyType==property)
    //console.log(filteredProjects)
  }

  if(service!="All"){
    filteredProjects=filteredProjects.filter((item)=>item.serviceType==service)
  }

  if (status !== "All") {
    filteredProjects = filteredProjects.filter((item) => item.payment?.paymentStatus === status)
  }

  if (name !== "") {
    filteredProjects = filteredProjects.filter((item) =>
      item.customerName?.toLowerCase().includes(name.toLowerCase())
    )
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

    const openAddModal = () => {
      setFormData({
        customerName: "",
        phone: "",
        email: "",
        address: "",
        serviceType: "rooftop",
        propertyType: "residential",
        installedCapacityKW: "",
        installationDate: "",
        paymentMode: "full",
        totalCost: "",
        amountPaid: "",
        paymentStatus: "pending"
      })
      setShowAddModal(true)
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
          `${BASE_URL}/api/projects/${editingProject._id}`,
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

    const addProject = async () => {
          try {
            const token = localStorage.getItem("token")

            const newProject = {
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

            const res = await axios.post(
              `${BASE_URL}/api/projects`,
              newProject,
              {
                headers: { Authorization: `Bearer ${token}` }
              }
            )
            //console.log(res)
            setProjects(prev => {
              const updated = [...prev, res.data.result];  //updates UI adds new project to the exisitng list of projects on UI so that new projects also appears on the top

              // sort by latest installationDate first
              updated.sort(
                (a, b) => new Date(b.installationDate) - new Date(a.installationDate) //sorts the project according to installation date
              );

              return updated;
            });
            setShowAddModal(false)

            toast.success("Project added successfully")

          } catch (error) {
            console.log(error)
            toast.error("Failed to add project")
          }
        }

  

  

  const display=(projects)=>{
    return projects.map((item)=>{
          const mongoDateString = item.installationDate
          const dateObject = new Date(mongoDateString)
          const installDate = `${dateObject.getDate()}-${dateObject.getMonth() + 1}-${dateObject.getFullYear()}`
          
          return(
            <div key={item._id} className='border border-gray-200 bg-white rounded-lg  shadow-md m-1 p-2 flex flex-col gap-3 hover:shadow-lg transition'>
              <section className='flex flex-row justify-between '>
                <h3 className='font-bold text-xl text-[#003366]'>{item.customerName}</h3>
                {/**Status of payment */}
                <div>
                  <h1 className=''>[{item.payment.paymentStatus}
                    {
                  item.payment.paymentStatus=="paid" ? <span className='text-green-500 inline-block align-middle'><GrStatusGoodSmall></GrStatusGoodSmall> </span> :
                  item.payment.paymentStatus=="partial" ?  <span className='text-yellow-500 inline-block align-middle'><GrStatusGoodSmall></GrStatusGoodSmall> </span> : <span className='text-red-500 inline-block align-middle'><GrStatusGoodSmall></GrStatusGoodSmall> </span>
                }
                     ]
                     </h1>
                </div>
                <h4 title='Installation date' className='text-[#333333] '>{installDate}</h4>
              </section>
              
              <section className='grid grid-cols-2 gap-2'> 
                <h3 className='text-gray-500 text-sm'>Phone</h3>
                <h3 className='text-[#003366] font-medium'>{item.phone}</h3>
                {
                  item.email!=null && (
                    <>
                    <h3 className='text-gray-500 text-sm'>Email</h3>
                    <h3 className='text-[#003366] font-medium'>{item.email}</h3>
                    </>
                  )
                }
              
                <h3 className='text-gray-500 text-sm'>Service</h3>
                <h3 className='text-[#003366] font-medium'>{item.serviceType}</h3>
                <h3 className='text-gray-500 text-sm'>Property</h3>
                <h3 className='text-[#003366] font-medium'>{item.propertyType}</h3>
                <h4 className='text-gray-500 text-sm'>Installed Capacity (kW)</h4>
                <h4 className='text-[#003366] font-medium'>{item.installedCapacityKW}</h4>
              </section>

              <section className='text-gray-500 text-sm'>
                <p>Address : {item.address}</p>
              </section>
              
              <section>
                <h3 className='text-lg font-bold italic text-[#003366]'>Payment Details</h3>
                
                <section className='grid grid-cols-2 gap-2'>
                  <h4 className='text-gray-500 text-sm'>Payment Mode</h4>
                  <h4 className='text-[#003366] font-medium'>:{item.payment.paymentMode}</h4>
                  <h4 className='text-gray-500 text-sm'>Total Cost</h4>
                  <h4 className='text-[#003366] font-medium'>:{item.payment.totalCost}</h4>
                  <h4 className='text-gray-500 text-sm'>Amount Paid</h4>
                  <h4 className='text-[#003366] font-medium'>:{item.payment.amountPaid}</h4>
                  <h4 className='text-gray-500 text-sm'>Payment Status</h4>
                  <h4 className='text-[#003366] font-medium'>:{item.payment.paymentStatus}</h4>
                </section>
              </section>
              
              <section className="flex justify-end">
                <button 
                  onClick={() => openEditModal(item)} 
                  className="px-4 py-1 bg-[#003366] rounded-xl text-white font-bold shadow-md hover:bg-[#002244] transition"
                >
                  Edit
                </button>
              </section>
            </div>
          )
        })
      }
      

  return (
    <main className=' m-8 flex flex-col gap-6'>
      {/**Earch bar + all filters */}
      <section className='flex sm:flex-col lg:flex-row  md:flex-row justify-between '>
        <div className='flex flex-row items-center'>
          <span className='inline-block text-xl text-[#003366] '><IoSearch /></span> 
          <input type="text" placeholder='Search by customer name' value={name} onChange={handleSearchBar} className=' w-full p-1 rounded-lg border-2 border-[#003366] text-[#333333]'/> 
        </div>

        <div>
          {/*Filter by propertyType */}
          <h3 className='text-[#333333] text-lg font-normal'>Filter by property</h3>
          <select name="property" id="" onChange={handlePropertyChange}>
            <option value="All">All</option>
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
          </select>
        </div>

        <div>
          {/*Filter by serviceType */}
          <h3 className='text-[#333333] text-lg font-normal'>Filter by service</h3>
          <select name="service" id="" onChange={handleSeviceChange}>
            <option value="All">All</option>
            <option value="rooftop">Rooftop</option>
            <option value="panel">Panel</option>
            <option value="inverter">Inverter</option>
          </select>
        </div>

        <div>
          {/*Filter by paymentStatus */}
          <h3 className='text-[#333333] text-lg font-normal'>Filter by payment status</h3>
          <select name="status" id="" onChange={handleStatusChange}>
            <option value="All">All</option>
            <option value="paid">Paid</option>
            <option value="partial">Partial</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </section>

      {/**Heading + Add new project */}
      <section className=' flex flex-row justify-between items-center'> {/**border border-black */}
        <h1 className="text-[#003366] text-xl font-bold p-2 italic">This section shows all the solar projects whose installation has been completed</h1> 
        <button title='Add new project' className='m-1' onClick={openAddModal}><span className=' text-4xl text-green-500 hover:text-green-700'><MdAddBox></MdAddBox></span></button>
      </section>
      
      {/**Display all projects */}
      <section className=' flex flex-col gap-2'> {/**border border-red-700 */}
        {display(filteredProjects)}
      </section>
      
      {/**For editing a particular project details */}
      {editingProject && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

    {/* Modal Container */}
    <div className="bg-white rounded-2xl shadow-xl w-[95%] max-w-3xl max-h-[90vh] overflow-y-auto p-6 relative">

      {/* Close Button */}
      <button 
        onClick={() => setEditingProject(null)}
        className="absolute top-3 right-4 text-gray-500 hover:text-black text-xl"
      >
        ✕
      </button>

      {/* Title */}
      <h2 className="text-2xl font-bold text-[#003366] mb-6">
        Edit Project
      </h2>

      {/* Form Grid */}
      <div className="grid md:grid-cols-2 gap-4">

        {/* Input Field */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-500">Customer Name</label>
          <input
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#003366]"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-500">Phone</label>
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="border rounded-lg p-2 focus:ring-2 focus:ring-[#003366]"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-500">Email</label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border rounded-lg p-2 focus:ring-2 focus:ring-[#003366]"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-500">Address</label>
          <input
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="border rounded-lg p-2 focus:ring-2 focus:ring-[#003366]"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-500">Service</label>
          <select 
            name="serviceType" 
            value={formData.serviceType} 
            onChange={handleChange}
            className="border rounded-lg p-2"
          >
            <option value="rooftop">Rooftop</option>
            <option value="panel">Panel</option>
            <option value="inverter">Inverter</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-500">Property</label>
          <select 
            name="propertyType" 
            value={formData.propertyType} 
            onChange={handleChange}
            className="border rounded-lg p-2"
          >
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-500">Capacity (kW)</label>
          <input
            name="installedCapacityKW"
            value={formData.installedCapacityKW}
            onChange={handleChange}
            className="border rounded-lg p-2"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-500">Installation Date</label>
          <input
            type="date"
            name="installationDate"
            value={formData.installationDate}
            onChange={handleChange}
            className="border rounded-lg p-2"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-500">Payment Mode</label>
          <select 
            name="paymentMode" 
            value={formData.paymentMode} 
            onChange={handleChange}
            className="border rounded-lg p-2"
          >
            <option value="full">Full</option>
            <option value="loan">Loan</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-500">Total Cost</label>
          <input
            name="totalCost"
            value={formData.totalCost}
            onChange={handleChange}
            className="border rounded-lg p-2"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-500">Amount Paid</label>
          <input
            name="amountPaid"
            value={formData.amountPaid}
            onChange={handleChange}
            className="border rounded-lg p-2"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-500">Payment Status</label>
          <select 
            name="paymentStatus" 
            value={formData.paymentStatus} 
            onChange={handleChange}
            className="border rounded-lg p-2"
          >
            <option value="paid">Paid</option>
            <option value="partial">Partial</option>
            <option value="pending">Pending</option>
          </select>
        </div>

      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 mt-6">
        <button 
          onClick={() => setEditingProject(null)}
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          Cancel
        </button>

        <button 
          onClick={saveChanges}
          className="px-4 py-2 bg-[#003366] text-white rounded-lg hover:bg-[#002244]"
        >
          Save Changes
        </button>
      </div>

    </div>
  </div>
)}

    {/**For adding new project */}
    {showAddModal && (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

        <div className="bg-white rounded-2xl shadow-xl w-[95%] max-w-3xl max-h-[90vh] overflow-y-auto p-6 relative">

          {/* Close */}
          <button 
            onClick={() => setShowAddModal(false)}
            className="absolute top-3 right-4 text-gray-500 hover:text-black text-xl"
          >
            ✕
          </button>

          {/* Title */}
          <h2 className="text-2xl font-bold text-[#003366] mb-6">
            Add New Project
          </h2>

          {/* Form */}
          <div className="grid md:grid-cols-2 gap-4">

            {/* SAME INPUTS AS EDIT */}
            {/* Just reuse everything */}

            <div className="flex flex-col">
              <label className="text-sm text-gray-500">Customer Name</label>
              <input name="customerName" value={formData.customerName} onChange={handleChange} className="border rounded-lg p-2" />
            </div>

            <div className="flex flex-col">
              <label className="text-sm text-gray-500">Phone</label>
              <input name="phone" value={formData.phone} onChange={handleChange} className="border rounded-lg p-2" />
            </div>

            <div className="flex flex-col">
              <label className="text-sm text-gray-500">Email</label>
              <input name="email" value={formData.email} onChange={handleChange} className="border rounded-lg p-2" />
            </div>

            <div className="flex flex-col">
              <label className="text-sm text-gray-500">Address</label>
              <input name="address" value={formData.address} onChange={handleChange} className="border rounded-lg p-2" />
            </div>

            <div className="flex flex-col">
              <label className="text-sm text-gray-500">Service</label>
              <select name="serviceType" value={formData.serviceType} onChange={handleChange} className="border rounded-lg p-2">
                <option value="rooftop">Rooftop</option>
                <option value="panel">Panel</option>
                <option value="inverter">Inverter</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-sm text-gray-500">Property</label>
              <select name="propertyType" value={formData.propertyType} onChange={handleChange} className="border rounded-lg p-2">
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-sm text-gray-500">Capacity (kW)</label>
              <input name="installedCapacityKW" value={formData.installedCapacityKW} onChange={handleChange} className="border rounded-lg p-2" />
            </div>

            <div className="flex flex-col">
              <label className="text-sm text-gray-500">Installation Date</label>
              <input type="date" name="installationDate" value={formData.installationDate} onChange={handleChange} className="border rounded-lg p-2" />
            </div>

            <div className="flex flex-col">
              <label className="text-sm text-gray-500">Payment Mode</label>
              <select name="paymentMode" value={formData.paymentMode} onChange={handleChange} className="border rounded-lg p-2">
                <option value="full">Full</option>
                <option value="loan">Loan</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-sm text-gray-500">Total Cost</label>
              <input name="totalCost" value={formData.totalCost} onChange={handleChange} className="border rounded-lg p-2" />
            </div>

            <div className="flex flex-col">
              <label className="text-sm text-gray-500">Amount Paid</label>
              <input name="amountPaid" value={formData.amountPaid} onChange={handleChange} className="border rounded-lg p-2" />
            </div>

            <div className="flex flex-col">
              <label className="text-sm text-gray-500">Payment Status</label>
              <select name="paymentStatus" value={formData.paymentStatus} onChange={handleChange} className="border rounded-lg p-2">
                <option value="paid">Paid</option>
                <option value="partial">Partial</option>
                <option value="pending">Pending</option>
              </select>
            </div>

          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-6">
            <button 
              onClick={() => setShowAddModal(false)}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>

            <button 
              onClick={addProject}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Add Project
            </button>
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


