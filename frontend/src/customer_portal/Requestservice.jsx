import {useState} from 'react'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast';

const Requestservice = () => {
    const { t, i18n } = useTranslation();

    let [currInfo,setInfo]=useState({
        name:"",
        phone:"",
        serviceType:"rooftop",
        propertyType:"residential",
        otp:""
    })

    let {name,phone,serviceType,propertyType,otp}=currInfo

    const handleChange=(e)=>{
        let {name,value}=e.target
        setInfo({ ...currInfo, [name]: value })
    }

    const [error,setError]=useState({})

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

        //OTP verification later while doing backend 
        if (flag==true){
            //means all info is entered correctly
            //we will send the query to the server so that it gets stored in database and admin can see it later
            //for now since backend is not there we will simply give a toast message
            toast.success("Query Submitted")
        }
        else{
            toast.error("Query submission failed! Check your inputs and try again.")
        }
    }

    return (
        <div>
            <h1> {t("customerPortal.requestService.title")}</h1>
            <p>{t("customerPortal.requestService.description")}</p> 

           <form action="" onSubmit={handleSubmit} method="post">
                <label >{t("customerPortal.requestService.name")} </label>
                <input type="text" name='name' value={name} onChange={handleChange}/>
                <div>
                    {error.name && <span>{error.name}</span>}
                </div> <br /><br />
                

                <label >{t("customerPortal.requestService.phone")} ( {t("customerPortal.requestService.otpNote")} )</label>
                <input type="text" name='phone' value={phone} onChange={handleChange}/> 
                <div>
                    {error.phone && <span>{error.phone}</span>}
                </div><br /><br />

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

                <label htmlFor="">OTP </label>
                <input type="text" name='otp' value={otp} onChange={handleChange}/> <br /><br />

                <button type='submit'>{t("customerPortal.requestService.submit")}</button>
           </form>
        </div>
    )
}

export default Requestservice
