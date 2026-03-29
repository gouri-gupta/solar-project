import React from 'react'
import AdminAuthContext from './context/AdminAuthContext'
import Approute from './routes/Approute'
import {Toaster} from 'react-hot-toast'
import { Analytics } from '@vercel/analytics/react';

const App = () => {
    return (
        <>
        <AdminAuthContext>
            <Toaster></Toaster>
            <Approute></Approute>
        </AdminAuthContext>
        <Analytics></Analytics>
        </>
    )
}

export default App
