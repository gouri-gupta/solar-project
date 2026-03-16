import {useState} from 'react'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast';
import axios from 'axios'

const Installedproject = () => {

    const { t, i18n } = useTranslation();

    const [currInfo,setInfo]=useState({
        name:"",
        phone:"",
        queryType:"billing",
        message:""
    })

    let {name,phone,queryType,message}=currInfo

    const handleChange=(e)=>{
        let {name,value}=e.target
        setInfo({ ...currInfo, [name]: value })
    }
    
    const [error,setError]=useState({})

    async function sendData(obj){
        try {
            let obj_to_send={name:obj.name,phone:obj.phone,queryType:obj.queryType,description:obj.message}
            let responseData=await axios.post("http://localhost:5000/api/customer-queries",obj_to_send)
            console.log(responseData)
            if(responseData.status==201){
                toast.success("Query submitted successfully")
                return;
            }
        } 
        catch (error) {
            //console.log(error)
            console.log(error.message)
            if(error.status==404){
                toast.error("Customer not found!")
            }
            else{
                toast.error("Something went wrong")
            }
            return;
        }
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        let validationErrors = {}

        let flag = true; //initially we assume there is no error

        //form validation
        //we will generate error ONLY when the user enters invalid data
        //name
        if (name === "") {
            validationErrors.name = "*This field is mandatory"
            flag = false
        }

        //phone
        let regexPhone = /^(\+91[-\s]?)?[0]?(91)?[6-9]\d{9}$/;
        if (phone.trim() == "") {
            validationErrors.phone = "*This field is mandatory"
            flag = false
        }
        else if (!regexPhone.test(phone)) {
            validationErrors.phone = "This should be a valid mobile number"
            flag = false
        }

        setError(validationErrors)

        //also need to check whether this mobile number or customer name is in our database or not
         
        if (flag==true){
            //means all info is entered correctly 
            //we will send the query to the server so that it gets stored in database and admin can see it later
            //for now since backend is not there we will simply give a toast message
            let obj=currInfo;
            sendData(obj)
        }
        else{
            toast.error("Query Submission failed! Check your inputs and try again.")
        }
    }

    return (
        <div className='border border-[#E0E0E0] m-8 flex flex-col bg-gray-50 gap-8 rounded-xl shadow-md'>
            
            <section className=' flex flex-col items-center text-center'>
                <h1 className="text-[#003366] text-2xl md:text-3xl lg:text-4xl font-bold italic p-2"> {t("customerPortal.existingQuery.title")}</h1>
                <p className="text-[#333333] text-xl italic p-2">{t("customerPortal.existingQuery.description")}</p>
            </section>

            <section>
                <form action="" onSubmit={handleSubmit} method="post" className=' flex flex-col max-w-xl mx-auto gap-5 m-2'>
                    <div className=' flex flex-col gap-2'>
                        <label className='text-[#333333] text-xl font-sans font-bold'>{t("customerPortal.existingQuery.name")} </label>
                        <input type="text" name='name' value={name} onChange={handleChange} className="w-full border border-gray-400 rounded-md px-2 py-1 focus:border-[#FDB813] focus:ring-[#FDB813]"/>
                        <div>
                            {error.name && <span className='text-red-700'>{error.name}</span>}
                        </div>
                    </div>
                    

                    <div className=' flex flex-col gap-2'>
                        <label className='text-[#333333] text-xl font-sans font-bold'>{t("customerPortal.existingQuery.phone")} </label>
                        <input type="text" name='phone' value={phone} onChange={handleChange} className="w-full border border-gray-400 rounded-md px-2 py-1 focus:border-[#FDB813] focus:ring-[#FDB813]"/> 
                        <div>
                            {error.phone && <span className='text-red-700'>{error.phone}</span>}
                        </div>
                    </div>

                    <div className=' flex flex-col gap-2'>
                        <label htmlFor="" className='text-[#333333] text-xl font-sans font-bold'>{t("customerPortal.existingQuery.queryType")} </label>
                        <select name="queryType" id="" onChange={handleChange} className="w-full border border-gray-400 rounded-md px-2 py-1 focus:border-[#FDB813] focus:ring-[#FDB813]">
                            <option value="billing">{t("customerPortal.existingQuery.types.billing")}</option>
                            <option value="performance">{t("customerPortal.existingQuery.types.performance")}</option>
                            <option value="maintenance">{t("customerPortal.existingQuery.types.maintenance")}</option>
                            <option value="other">{t("customerPortal.existingQuery.types.other")}</option>
                        </select>
                    </div>

                    <div className=' flex flex-col gap-2'>                       
                        <label htmlFor="" className='text-[#333333] text-xl font-sans font-bold'>{t("customerPortal.existingQuery.message")} </label>
                        <textarea name="message" id="" value={message} onChange={handleChange} className="w-full border border-gray-400 rounded-md px-2 py-1 focus:border-[#FDB813] focus:ring-[#FDB813]"></textarea>
                    </div>
                    

                    <div className='text-center'>
                        <button type='submit' className="px-3 py-2 bg-[#FDB813] rounded-lg text-[#003366] font-bold shadow-md hover:bg-[#003366] hover:text-white border border-transparent hover:border-white transition">{t("customerPortal.existingQuery.submit")}</button>
                    </div>
                </form>
            </section>

        </div>
    )
}

export default Installedproject
