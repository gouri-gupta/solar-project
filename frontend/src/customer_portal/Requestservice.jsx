import {useState} from 'react'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast';
import axios from 'axios'

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
            let k=await axios.post("http://localhost:5000/api/request-services",obj)
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
        <div>
            <h1> {t("customerPortal.requestService.title")}</h1>
            <p>{t("customerPortal.requestService.description")}</p> 

           <form  onSubmit={handleSubmit}>
                <label >{t("customerPortal.requestService.name")} </label>
                <input type="text" name='name' value={name} onChange={handleChange}/>
                <div>
                    {error.name && <span>{error.name}</span>}
                </div> <br /><br />
                

                <label >{t("customerPortal.requestService.phone")} ( {t("customerPortal.requestService.otpNote")} )</label>
                <input type="text" name='phone' value={phone} onChange={handleChange} disabled={otpSent}/> 
                <div>
                    {error.phone && <span>{error.phone}</span>}
                </div>
                <button type="button" onClick={checkMobile} disabled={otpSent}>Get OTP</button>
                <br /><br />
                
                
                {
                    otpSent && (
                        <>
                            <label htmlFor="">OTP </label>
                            <input type="text" name='otp' value={otp} onChange={handleChange} disabled={otpVerified}/> 
                            <p>OTP will remain valid for 5 minutes</p>
                            <button type="button" onClick={verifyOTP} disabled={otpVerified}> Verify OTP</button>
                            <br /><br />
                        </>
                    )
                }

                <label htmlFor="">{t("customerPortal.requestService.serviceType")} </label>
                <select name="serviceType" id="" onChange={handleChange}>
                    <option value="rooftop">{t("customerPortal.requestService.services.rooftop")}</option>
                    <option value="panels">{t("customerPortal.requestService.services.panels")}</option>
                    <option value="inverter">{t("customerPortal.requestService.services.inverter")}</option>
                </select><br /><br />

                <label htmlFor="">{t("customerPortal.requestService.propertyType")} </label>
                <select name="propertyType" id="" onChange={handleChange}>
                    <option value="residential">{t("customerPortal.requestService.property.residential")}</option>
                    <option value="commercial">{t("customerPortal.requestService.property.commercial")}</option>
                </select><br /><br />


                <button type="submit">{t("customerPortal.requestService.submit")}</button>
           </form>
        </div>
    )
}

export default Requestservice
