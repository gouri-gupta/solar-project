import {useContext} from 'react'
import { Link } from 'react-router-dom'
import { Outlet } from 'react-router-dom'

const AdminDashboard = () => {

    

  return (
    
    <main className=' flex flex-col m-8 gap-8'>

        {/**Title section */}
        <section className=' flex flex-col items-center text-center'>
            <h1 className="text-[#003366] text-4xl md:text-5xl lg:text-6xl font-bold italic p-2">Welcome to Admin Dashboard</h1>
        </section>

        {/**Tiles for various features of admin dashboard */}
        <section className=' grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
            
                <Link to="/admindashboard/projects">
                    <div className='border border-transparent w-full h-full  p-2 flex flex-col justify-center bg-[#FDB813] rounded-lg shadow-md text-[#003366]  hover:bg-[#003366] hover:text-white hover:border-white transition hover:scale-110'>
                        <h1 className='text-center font-bold text-xl'>View all Projects</h1>
                    </div>
                </Link>
            

            
                <Link to="/admindashboard/requestservices">
                    <div className='border border-transparent w-full h-full  p-2 flex flex-col justify-center bg-[#FDB813] rounded-lg shadow-md text-[#003366]  hover:bg-[#003366] hover:text-white hover:border-white transition hover:scale-110'>
                        <h1 className='text-center font-bold text-xl'>View all Requested Services</h1>
                    </div>
                </Link>
            

            
                <Link to="/admindashboard/sitevisits">
                    <div className='border border-transparent w-full h-full  p-2 flex flex-col justify-center bg-[#FDB813] rounded-lg shadow-md text-[#003366]  hover:bg-[#003366] hover:text-white hover:border-white transition hover:scale-110'>
                        <h1 className='text-center font-bold text-xl'>View all Requested Site Visits</h1>
                    </div>
                </Link>
            

            
                <Link to="/admindashboard/customerqueries">
                    <div className='border border-transparent w-full h-full  p-2 flex flex-col justify-center bg-[#FDB813] rounded-lg shadow-md text-[#003366]  hover:bg-[#003366] hover:text-white hover:border-white transition hover:scale-110'>
                        <h1 className='text-center font-bold text-xl'>View all Customer Queries</h1>
                    </div>
                </Link>
            
        </section>

    </main>
    
  )
}

export default AdminDashboard