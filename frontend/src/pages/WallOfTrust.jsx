import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import toast from 'react-hot-toast'

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const WallOfTrust = () => {
    const { t } = useTranslation();
    const [images, setImages] = useState([])
    const [loading, setLoading] = useState(true)

    const getData = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/projects/public`)
            setImages(response.data)
        }
        catch (error) {
            console.log(error.message)
            toast.error("Failed to load images")
        }
        finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <main className="m-8 flex flex-col gap-8">

            {/* Title Section */}
            <section className="flex flex-col items-center text-center">
                <h1 className="text-[#003366] text-4xl md:text-5xl lg:text-6xl font-bold italic p-2">
                    {t("wallOfTrust")}
                </h1>

                <h2 className="text-[#004C99] text-lg md:text-xl lg:text-2xl italic font-semibold p-2">
                    {t("wotPage.subtitle")}
                </h2>

                <h4 className="text-[#333333] text-xl italic p-2">
                    ({t("wotPage.privacyNote")})
                </h4>
            </section>



            {/* Projects Grid */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                {
                    loading ? (
                        <div className="col-span-full flex justify-center items-center h-[40vh]">
                            <p className="text-xl font-semibold text-[#003366] animate-pulse">
                                Loading images...
                            </p>
                        </div>
                    ) :
                    images.map((item) => (
                    
                    <div key={item._id} className="bg-white rounded-xl shadow-md overflow-hidden group p-1 border-2 border-yellow-200">
                        {/* Project Image */}
                        <img
                            src={item.images[0]}
                            alt="solar project"
                            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                        />

                    </div>

                ))
                }

                

            </section>

        </main>
    )
}

export default WallOfTrust

/*
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
        <main className=' m-8 flex flex-col gap-4'>
            <section className=' flex flex-col content-center items-center'>
                <h1 className='text-[#003366] text-4xl md:text-5xl lg:text-6xl font-bold italic p-2'>{t("wallOfTrust")}</h1>
                <h2 className='text-[#004C99] text-lg md:text-xl lg:text-2xl italic font-semibold p-2'>{t("wotPage.subtitle")}</h2>
                <h4 className='text-[#333333] text-xl italic p-2'>({t("wotPage.privacyNote")})</h4>
            </section>

            <section>
                {
                    images.map((item)=>{
                        return(
                            <div key={item._id} className='border border-black flex flex-row justify-evenly '>
                                
                                <img src={item.images[0]} alt="project" className='object-cover'/>
                            </div>
                        )
                    })
                }
            </section>
        </main>
    )
}

export default WallOfTrust*/
 