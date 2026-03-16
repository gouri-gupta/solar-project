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
        <div className='m-8 flex flex-col gap-8'>

            <section className=' flex flex-col items-center text-center'>
                <h1 className="text-[#003366] text-2xl md:text-3xl lg:text-4xl font-bold  p-2">{t("loginPage.title")}</h1>
                <p className="text-[#333333] text-xl italic p-2">{t("loginPage.subtitle")}</p>
            </section>
            
            <section>
                <form action="" onSubmit={handleSubmit} method="post" className=' flex flex-col max-w-xl mx-auto gap-5 m-2'>
                    <div className=' flex flex-col gap-2'>
                        <label htmlFor="" className='text-[#333333] text-xl font-sans font-bold'>{t("loginPage.inputs.email.label")}</label>
                        <input type="text" placeholder={t("loginPage.inputs.email.placeholder")} name='email' value={email} onChange={handleChange} className="w-full border border-gray-400 rounded-md px-2 py-1 focus:border-[#FDB813] focus:ring-[#FDB813]"/> 
                    </div> 

                    <div className=' flex flex-col gap-2'>
                        <label htmlFor="" className='text-[#333333] text-xl font-sans font-bold'>{t("loginPage.inputs.password.label")}</label>
                        <input type="password" placeholder={t("loginPage.inputs.password.placeholder")} name='password' value={password} onChange={handleChange} className="w-full border border-gray-400 rounded-md px-2 py-1 focus:border-[#FDB813] focus:ring-[#FDB813]"/> 
                    </div>

                    <div className=' text-center'>
                        <button type='submit' className="px-3 py-2 bg-[#FDB813] rounded-lg text-[#003366] font-bold shadow-md hover:bg-[#003366] hover:text-white border border-transparent hover:border-white transition">{t("loginPage.button.login")}</button>
                    </div>
                </form>
            </section>

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
