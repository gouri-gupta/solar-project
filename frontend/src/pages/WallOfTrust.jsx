import { useEffect,useState } from 'react';
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import toast from 'react-hot-toast'

const WallOfTrust = () => {
     const { t, i18n } = useTranslation();
     let [images,setImages]=useState([])

     const getData=async ()=>{
        //this function fetches all the images 
        try {
            const response=await axios.get("http://localhost:5000/api/projects/public")
            //console.log(response)
            setImages(response.data)
        } 
        catch (error) {
            console.log(error.message)
            toast.error("Failed to load images")
        }
     }

     useEffect(()=>{
        getData()
     },[])

    return (
        <div>
            <h1>{t("wallOfTrust")}</h1>
            <h2>{t("wotPage.subtitle")}</h2>
            <h4>{t("wotPage.privacyNote")}</h4>
            {/*Add a filter of residential and commercial */}

            {
                images.map((item)=>{
                    return(
                        <div key={item._id}>
                            {/*<h1>{item.images[0]}</h1> */}
                            <img src={item.images[0]} alt="project" />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default WallOfTrust
