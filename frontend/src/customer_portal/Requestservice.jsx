import {useState} from 'react'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast';
import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Requestservice = () => {
    const { t, i18n } = useTranslation();

    let [currInfo,setInfo]=useState({
        name:"",
        phone:"",
        serviceType:"rooftop",
        propertyType:"residential",
        otp:""
    })

    let [otpSent,setOTPSent]=useState(false) //this checks whether OTP is sent or not
    let [otpVerified,setOTPVerified]=useState(false) //this checks whether OTP is verified or not

    let {name,phone,serviceType,propertyType,otp}=currInfo

    async function sendData(obj){
        //Here we will do OTP verification also But that is later
        try {
            let k=await axios.post(`${BASE_URL}/api/request-services`,obj)
            console.log(k);
            toast.success("Query Submitted successfully")
        } 
        catch (error) {
            console.log(error.message)
            toast.error("Something went wrong")
        }
        return 
    }

    const handleChange=(e)=>{
        let {name,value}=e.target
        setInfo({ ...currInfo, [name]: value })
    }

    const [error,setError]=useState({})

    const handleSubmit=(e)=>{
        e.preventDefault();
        let validationErrors = {}

        if(!otpVerified){
            toast.error("Please verify OTP first")
            return
        }

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

        //OTP verification later while doing backend 
        if (flag==true){
            //means all info is entered correctly
            //we will send the query to the server so that it gets stored in database and admin can see it later
            //for now since backend is not there we will simply give a toast message
            let newObj={name,phone,serviceType,propertyType}
            sendData(newObj)
        }
        else{
            toast.error("Query submission failed! Check your inputs and try again.")
        }
    }

    const checkMobile=async (e)=>{
        e.preventDefault()
        let validationErrors = {}
        let flag=true
        let regexPhone = /^(\+91[-\s]?)?[0]?(91)?[6-9]\d{9}$/;
        if (phone.trim() == "") {
            validationErrors.phone = "*This field is mandatory"
            flag = false
        }
        else if (!regexPhone.test(phone)) {
            validationErrors.phone = "This should be a valid mobile number"
            flag = false
        }

        if(flag==false){
            //means not a valid phone number
            toast.error("Please enter a valid mobile number")
        }
        else{
            //valid phone number is entered
            let newObj={phone}
            let k=await axios.post("http://localhost:5000/api/otp/send",newObj)
            console.log(k)
            if(k.data.success){
                setOTPSent(true)
                toast.success("OTP sent successfully")
            }
            else{
                toast.error(`${k.data.message}`)
            }
        }
    }

    const verifyOTP=async ()=>{
        let obj = { phone, otp }

        try {
            let res = await axios.post("http://localhost:5000/api/otp/verify", obj)

            if(res.data.success){
                toast.success("Phone number verified successfully.Please proceed")
                setOTPVerified(true)
            }
        } 
        catch(err){
            console.log(err.message)
            toast.error("Invalid OTP")
        }
    }

    return (
        <div className='border border-[#E0E0E0] m-8 flex flex-col bg-gray-50 gap-8 rounded-xl shadow-md'>

            <section className=' flex flex-col items-center text-center'> {/**border border-blue-800 */}
                <h1 className="text-[#003366] text-2xl md:text-3xl lg:text-4xl font-bold italic p-2"> {t("customerPortal.requestService.title")}</h1>
                <p className="text-[#333333] text-xl italic p-2">{t("customerPortal.requestService.description")}</p>    
            </section> 

           <section className=''> {/**border border-gray-800 */}
                <form  onSubmit={handleSubmit} className=' flex flex-col max-w-xl mx-auto gap-5 m-2'> {/**border border-blue-800 */}
                    <div className=' flex flex-col gap-2'> {/**border border-green-800 */}
                        <label className='text-[#333333] text-xl font-sans font-bold'>{t("customerPortal.requestService.name")} </label>
                        <input type="text" name='name' value={name} onChange={handleChange} className="w-full border border-gray-400 rounded-md px-2 py-1 focus:border-[#FDB813] focus:ring-[#FDB813]"/>
                        <div>
                            {error.name && <span className='text-red-700'>{error.name}</span>}
                        </div> 
                    </div>
                    

                    <div className=' flex flex-col gap-2'> {/**border border-green-800 */}
                        <label className='text-[#333333] text-xl font-sans font-bold'>{t("customerPortal.requestService.phone")} ( {t("customerPortal.requestService.otpNote")} )</label>
                        <input type="text" name='phone' value={phone} onChange={handleChange} disabled={otpSent} className="w-full border border-gray-400 rounded-md px-2 py-1 focus:border-[#FDB813] focus:ring-[#FDB813]"/> 
                        <div>
                            {error.phone && <span className='text-red-700'>{error.phone}</span>}
                        </div>
                        <button type="button" onClick={checkMobile} disabled={otpSent} className="w-1/5 px-3 py-2 bg-[#FDB813] rounded-lg text-[#003366] font-bold shadow-md hover:bg-[#003366] hover:text-white border border-transparent hover:border-white transition">Get OTP</button>
                    </div>
                    
                    
                    
                    {
                        otpSent && (
                            <div className=' flex flex-col gap-2'> {/**border border-green-800 */}
                                <label htmlFor="" className='text-[#333333] text-xl font-sans font-bold'>OTP </label>
                                <input type="text" name='otp' value={otp} onChange={handleChange} disabled={otpVerified} className="w-full border border-gray-400 rounded-md px-2 py-1 focus:border-[#FDB813] focus:ring-[#FDB813]"/> 
                                <p className='text-[#333333] font-sans italic font-normal'>OTP will remain valid for 5 minutes</p>
                                <button type="button" onClick={verifyOTP} disabled={otpVerified} className="w-1/5 px-3 py-2 bg-[#FDB813] rounded-lg text-[#003366] font-bold shadow-md hover:bg-[#003366] hover:text-white border border-transparent hover:border-white transition"> Verify OTP</button>
                                
                            </div>
                        )
                    }

                    <div className=' flex flex-col gap-2'> {/**border border-green-800 */}
                        <label htmlFor="" className='text-[#333333] text-xl font-sans font-bold'>{t("customerPortal.requestService.serviceType")} </label>
                        <select name="serviceType" id="" onChange={handleChange} className="w-full border border-gray-400 rounded-md px-2 py-1 focus:border-[#FDB813] focus:ring-[#FDB813]">
                            <option value="rooftop">{t("customerPortal.requestService.services.rooftop")}</option>
                            <option value="panels">{t("customerPortal.requestService.services.panels")}</option>
                            <option value="inverter">{t("customerPortal.requestService.services.inverter")}</option>
                        </select>
                    </div>

                    <div className=' flex flex-col gap-2'> {/**border border-green-800 */}
                        <label htmlFor="" className='text-[#333333] text-xl font-sans font-bold'>{t("customerPortal.requestService.propertyType")} </label>
                        <select name="propertyType" id="" onChange={handleChange} className="w-full border border-gray-400 rounded-md px-2 py-1 focus:border-[#FDB813] focus:ring-[#FDB813]">
                            <option value="residential">{t("customerPortal.requestService.property.residential")}</option>
                            <option value="commercial">{t("customerPortal.requestService.property.commercial")}</option>
                        </select>
                    </div>


                    <div className=' text-center'> {/**border border-green-800 */}
                        <button type="submit" className="px-3 py-2 bg-[#FDB813] rounded-lg text-[#003366] font-bold shadow-md hover:bg-[#003366] hover:text-white border border-transparent hover:border-white transition">{t("customerPortal.requestService.submit")}</button>
                    </div>
                </form>
           </section>
        </div>
    )
}

export default Requestservice
