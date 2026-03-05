import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from '../pages/Home'
import Contact from '../pages/Contact'
import Calculator from '../pages/Calculator'
import FAQ from '../pages/FAQ'
import Services from '../pages/Services'
import WallOfTrust from '../pages/WallOfTrust'
import Notfound from '../pages/Notfound'
import MainLayout from '../layout/MainLayout'
import Login from '../pages/Login'
import Requestservice from '../customer_portal/Requestservice'
import Sitevisit from '../customer_portal/Sitevisit'
import Installedproject from '../customer_portal/Installedproject'
import Visitingcard from '../customer_portal/Visitingcard'
import AdminDashboard from '../pages/AdminDashboard'
import RequestedServices from '../admin_dashboard/RequestedServices'
import RequestedSiteVisits from '../admin_dashboard/RequestedSiteVisits'
import CustomerQueries from '../admin_dashboard/CustomerQueries'
import Projects from '../admin_dashboard/Projects'
import ProtectedRoute from './ProtectedRoute'


const Approute = () => {

    let routepath = createBrowserRouter([
        {
            path: "/",
            element: <MainLayout />,
            children: [
                {
                    index: true,
                    element: <Home />
                },
                {
                    path: "/contact",
                    element: <Contact />
                },
                {
                    path: "/contact/requestservice",
                    element: <Requestservice></Requestservice>
                },
                {
                    path:"/contact/sitevisit",
                    element:<Sitevisit></Sitevisit>
                },
                {
                    path:"/contact/installedproject",
                    element:<Installedproject></Installedproject>
                },
                {
                    path: "/calculator",
                    element: <Calculator />
                },
                {
                    path: "/faq",
                    element: <FAQ />
                },
                {
                    path: "/services",
                    element: <Services />
                },
                {
                    path: "/walloftrust",
                    element: <WallOfTrust />
                },
                {
                    path: "/login",
                    element: <Login></Login>
                },
                {
                    path: '*',
                    element: <Notfound />
                },
                {
                    path:'/admindashboard',
                    element:<ProtectedRoute><AdminDashboard></AdminDashboard></ProtectedRoute>
                },
                {
                    path:'/admindashboard/requestservices',
                    element:<ProtectedRoute>:<RequestedServices></RequestedServices></ProtectedRoute>
                },
                {
                    path:'/admindashboard/sitevisits',
                    element:<ProtectedRoute><RequestedSiteVisits></RequestedSiteVisits> </ProtectedRoute>
                },
                {
                    path:'/admindashboard/customerqueries',
                    element:<ProtectedRoute><CustomerQueries></CustomerQueries></ProtectedRoute>
                },
                {
                    path:'/admindashboard/projects',
                    element:<ProtectedRoute><Projects></Projects></ProtectedRoute>
                }
                
            ]
        }
    ])

    return (
        <RouterProvider router={routepath}>

        </RouterProvider>
    )
}

export default Approute

/*
{
                    path:'/admindashboard',
                    element:<AdminDashboard></AdminDashboard>},
                {
                    path:'/admindashboard/requestservices',
                    element:<RequestedServices></RequestedServices>
                },
                {
                    path:'/admindashboard/sitevisits',
                    element:<RequestedSiteVisits></RequestedSiteVisits>
                },
                {
                    path:'/admindashboard/customerqueries',
                    element:<CustomerQueries></CustomerQueries>
                },
                {
                    path:'/admindashboard/projects',
                    element:<Projects></Projects>
                }
*/


/*
Define URLs

Decide which component renders for which path

Decide which layout wraps which pages

AppRoute.jsx = “Map of the website”

Nothing UI-related belongs here.
*/

//If a route has children, its component must render <Outlet />

