import React from 'react'
import AdminAuthContext from './context/AdminAuthContext'
import Approute from './routes/Approute'
import {Toaster} from 'react-hot-toast'

const App = () => {
    return (
        <>
        <AdminAuthContext>
            <Toaster></Toaster>
            <Approute></Approute>
        </AdminAuthContext>
        </>
    )
}

export default App
