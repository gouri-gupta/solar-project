import {useContext} from 'react'
import { Link } from 'react-router-dom'
import { Outlet } from 'react-router-dom'

const AdminDashboard = () => {

    

  return (
    
    <main>
        <h1>Welcome to Admin Dashboard</h1>

        <div>
            <h1><Link to="/admindashboard/projects">View all Projects</Link> </h1>
        </div>

        <div>
            <h1><Link to="/admindashboard/requestservices">View all Requested Services</Link> </h1>
        </div>

        <div>
            <h1><Link to="/admindashboard/sitevisits">View all Requested Site Visits</Link> </h1>
        </div>

        <div>
            <h1><Link to="/admindashboard/customerqueries">View all Customer Queries</Link> </h1>
        </div>

    </main>
    
  )
}

export default AdminDashboard