import {useState,useContext} from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AdminContext } from '../context/AdminAuthContext';
import axios from 'axios'


const Login = () => {
    const { t, i18n } = useTranslation();

    let d=useContext(AdminContext)
    console.log(d)
    let {isLogged,loginAdmin,logoutAdmin}=d

    let navigate=useNavigate()
    
    const [curradmin,setcurrAdmin]=useState({
            email:"",
            password:""
        })  

    let {email,password}=curradmin

    async function sendData(obj){
        try {
            const k=await axios.post("http://localhost:5000/api/admin/login",obj)
            let {data}=k;
            if(data.success){
                //logged in successfully
                loginAdmin()
                //store token in local storage
                localStorage.setItem("token",data.token)
                //toast message
                toast.success("Logged in successfully")
                //navigate to home page
                navigate("/admindashboard")
            }
            else{
                toast.error("Invalid Login credentials")
            }
        } 
        catch (error) {
            //console.log(error)
            console.log(error.message)
            toast.error("Invalid Login credentials")
        }
    }
    

    const handleChange=(e)=>{
        let { name, value } = e.target
        setcurrAdmin({...curradmin,[name]:value})
    }

    const [errorMsg,showErrorMsg]=useState(false)

    const handleSubmit=(e)=>{
         e.preventDefault()
        //on click of log in button whether admin exists in the admin database or not 
        //for now dummy data only

        let newObj={e:email,p:password}
        sendData(newObj)
        
        /*if(email=="girish" && password=="2208"){
            loginAdmin(curradmin)
            navigate("/")
            toast.success("Logged in successfully")
        }
        else{
            showErrorMsg(true)
            toast.error("Invalid Login credentials")
        }*/
    }


    return (
        <div>
            <h1>{t("loginPage.title")}</h1>
            <p>{t("loginPage.subtitle")}</p>
            <form action="" onSubmit={handleSubmit} method="post">
                <label htmlFor="">{t("loginPage.inputs.email.label")}</label>
                <input type="text" placeholder={t("loginPage.inputs.email.placeholder")} name='email' value={email} onChange={handleChange}/> <br /> <br />
                <label htmlFor="">{t("loginPage.inputs.password.label")}</label>
                <input type="password" placeholder={t("loginPage.inputs.password.placeholder")} name='password' value={password} onChange={handleChange}/> <br /> <br />
                <button type='submit'>{t("loginPage.button.login")}</button>
            </form>

            {
                errorMsg && (
                    <main>
                        <h1> {t("loginPage.messages.invalid")}</h1>
                        <h3>{t("loginPage.messages.required")}</h3>
                    </main>
                )
            }
        </div>
    )
}

export default Login
