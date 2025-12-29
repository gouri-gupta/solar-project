import {createContext,useState} from 'react'
import toast from 'react-hot-toast'

export let AdminContext=createContext()

const AdminAuthContext = ({children}) => {

    const [admin,setAdmin]=useState({
            email:"",
            password:""
        })  //to store admin info

    /*
    ISSUE 2: Context admin password should not exist long-term
    This is okay temporarily, but architecturally:
    Context should NOT store raw passwords

    Later backend login should return:
        email
        role
        token / session info

    📌 For now it’s acceptable, but:
    Remember to remove password from context when backend is added.
    */

    const [isLogged,setLoggedIn]=useState(false);
    //isLogged = true when the admin logs in and false otherwise

    const loginAdmin=(userObj)=>{
        setAdmin(userObj)
        setLoggedIn(true)
    }

    const logoutAdmin=()=>{
        setAdmin({email:"",password:""})
        setLoggedIn(false)
        toast.success("Logged out successfully")
    }


    return (
        <AdminContext.Provider value={{admin,isLogged,loginAdmin,logoutAdmin}}>
            {children}
        </AdminContext.Provider>
    )
}

export default AdminAuthContext

/*
Login state is global

Navbar / routes / pages can read it

Exactly what a real app needs
*/