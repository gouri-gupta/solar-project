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
Define URLs

Decide which component renders for which path

Decide which layout wraps which pages

AppRoute.jsx = “Map of the website”

Nothing UI-related belongs here.
*/

//If a route has children, its component must render <Outlet />

