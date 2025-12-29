import {useState} from 'react'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast';

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
            toast.success("Query Submitted Successfully")
        }
        else{
            toast.error("Query Submission failed! Check your inputs and try again.")
        }
    }

    return (
        <>
            <h1> {t("customerPortal.existingQuery.title")}</h1>
            <p>{t("customerPortal.existingQuery.description")}</p>

            <form action="" onSubmit={handleSubmit} method="post">
                <label >{t("customerPortal.existingQuery.name")} </label>
                <input type="text" name='name' value={name} onChange={handleChange}/>
                <div>
                    {error.name && <span>{error.name}</span>}
                </div> <br /><br />
                

                <label >{t("customerPortal.existingQuery.phone")} </label>
                <input type="text" name='phone' value={phone} onChange={handleChange}/> 
                <div>
                    {error.phone && <span>{error.phone}</span>}
                </div><br /><br />

                <label htmlFor="">{t("customerPortal.existingQuery.queryType")} </label>
                <select name="queryType" id="" onChange={handleChange}>
                    <option value="billing">{t("customerPortal.existingQuery.types.billing")}</option>
                    <option value="performance">{t("customerPortal.existingQuery.types.performance")}</option>
                    <option value="maintenance">{t("customerPortal.existingQuery.types.maintenance")}</option>
                    <option value="other">{t("customerPortal.existingQuery.types.other")}</option>
                </select> <br /><br />

                <label htmlFor="">{t("customerPortal.existingQuery.message")} </label>
                <textarea name="message" id="" value={message} onChange={handleChange}></textarea>
                <br /><br />

                <button type='submit'>{t("customerPortal.existingQuery.submit")}</button>
            </form>
        </>
    )
}

export default Installedproject
