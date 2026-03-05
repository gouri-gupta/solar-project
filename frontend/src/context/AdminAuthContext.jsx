import {createContext,useState,useEffect} from 'react'
import toast from 'react-hot-toast'

export let AdminContext=createContext()

const AdminAuthContext = ({children}) => {

    /*const [admin,setAdmin]=useState({
            email:"",
            password:""
        })  //to store admin info*/

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

    const loginAdmin=()=>{
        //setAdmin(userObj)
            setLoggedIn(true)
    }

    const logoutAdmin=()=>{
        localStorage.removeItem("token")
        //setAdmin({email:"",password:""})
        setLoggedIn(false)
        toast.success("Logged out successfully")
    }

    useEffect(()=>{
        if(localStorage.getItem("token")){
            loginAdmin();
        }
    },[])

    return (
        <AdminContext.Provider value={{isLogged,loginAdmin,logoutAdmin}}>
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


/*
⚠️ One Small Improvement (Professional Level)

Right now you are doing:

if(localStorage.getItem("token")){
    loginAdmin();
}

This checks only existence.

But what if:

Token is expired?

Token is corrupted?

Someone manually edited localStorage?

Frontend will still treat user as logged in.

Professional improvement (later):

On app load:

Send token to backend

Verify token using protected route

If invalid → remove token + logout

But for now, your implementation is perfectly fine.

*/