import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const MainLayout = () => {
  const { t, i18n } = useTranslation();
  console.log("Main Lyout")
    return (
        <>  
          <Navbar></Navbar>

          <Outlet></Outlet>
           
        </>
    )
}

export default MainLayout
/*
Navbar → always visible

Outlet → placeholder where Home, Services, FAQ, etc. will render
*/
/*
Navbar appears on all pages

Because:

MainLayout is now the route element for /

All pages render inside its <Outlet />

✅ Home loads at /

Because:

index: true makes Home the default child

No /home URL needed

✅ Navigation works cleanly

/services → Services

/faq → FAQ

/calculator → Calculator

/contact → Contact

✅ No manual rendering mistakes

MainLayout is NOT rendered manually

RouterProvider is used correctly

🔑 Golden Rule (remember this forever)

Layouts go in routes.
Pages go in children.
Outlet is mandatory.
RouterProvider renders only what routes define.
*/