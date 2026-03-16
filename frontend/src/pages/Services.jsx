import React from 'react'
import { useTranslation } from 'react-i18next';
import residentialsolarRooftop from '../assets/images/residentialsolarRooftop.jpg'
import solarInverter from '../assets/images/solarInverter.jpg'
import solarPanel from '../assets/images/solarPanel.jpg'
import { TiTick } from "react-icons/ti";
import { BsCheckLg } from "react-icons/bs";
import { BsCheckCircleFill } from "react-icons/bs";

const Services = () => {
    const { t, i18n } = useTranslation();
    const a = t("servicesPage.items.rooftopSolar.points",{ returnObjects: true });
    const b=t("servicesPage.items.solarPanels.points",{ returnObjects: true });
    const c=t("servicesPage.items.solarInverter.points",{ returnObjects: true });

        return (
            <main className=' m-8 flex flex-col gap-4 max-w-7xl mx-auto'> {/*border border-black */}

                {/**Heading / Title of page */}
                <div className=' flex flex-col content-center items-center'> {/*border border-blue-800 */}
                    <h1 className='text-[#003366] text-4xl md:text-5xl lg:text-6xl font-bold italic p-2'>{t("servicesPage.title")}</h1>
                    <h3 className='text-[#004C99] text-lg md:text-xl lg:text-2xl italic font-semibold p-2'>{t("servicesPage.subtitle")}</h3>
                </div>

                <div className=' flex flex-col gap-5'> {/*border border-black */}
                    {/**Solar Rooftop section */}
                    <section className=' flex flex-col lg:flex-row m-2 p-6 min-h-[350px] gap-6'> {/*border border-red-800 */}
                        <div className=' lg:w-1/2'> {/**border border-fuchsia-700 */}
                            {/*Service title */}
                            <h1 className='text-3xl font-sans font-bold text-[#003366] p-2 m-1'>{t("servicesPage.items.rooftopSolar.title")}</h1>

                            {/**Service description */}
                            <p className='font-sans text-[#333333] text-xl m-1 p-2'>{t("servicesPage.items.rooftopSolar.description")}</p>
                            <ul className='space-y-2 m-3'>
                                {
                                a.map((pt)=>{
                                    return(
                                        <li key={pt} className='font-sans text-[#004C99] text-xl '> 
                                            {pt}
                                        </li>   
                                    )
                                })
                            }
                            </ul>
                        </div>

                        <div className=' lg:w-1/2'> {/**border border-yellow-800 */}
                            {/**Service image */}
                            <img src={residentialsolarRooftop} alt="Solar Rooftop" className='w-full h-full object-cover rounded-lg shadow-md'/>
                        </div>
                    </section>
                    <hr />
        
                    
                    {/**Solar Panel section */}
                    <section className=' flex flex-col lg:flex-row-reverse m-2 p-6 min-h-[350px] gap-6'> {/**border border-green-800 */}
                        <div className=' lg:w-1/2'> {/**border border-fuchsia-700 */}
                            {/**Service title */}
                            <h1 className='text-3xl font-sans font-bold text-[#003366] p-2 m-1'>{t("servicesPage.items.solarPanels.title")}</h1>
                            
                            {/**Service description */}
                            <p className='font-sans text-[#333333] text-xl m-1 p-2'>{t("servicesPage.items.solarPanels.description")}</p>
                            <ul className='space-y-2 m-3'>
                                {
                                b.map((pt)=>{
                                    return(
                                        <li  key={pt}className='font-sans text-[#004C99] text-xl '>
                                            {pt}
                                        </li>
                                    )
                                })
                            }
                            </ul>
                        </div>

                        <div className='lg:w-1/2'> {/**border border-yellow-800 */}
                            {/**Service image */}
                            <img src={solarPanel} alt="Solar Panel" className='w-full h-full object-cover rounded-lg shadow-md'/>
                        </div>
                    </section>
                    <hr />
                    
                    {/**Solar Inverter section */}
                    <section className=' flex flex-col lg:flex-row m-2 p-6 min-h-[350px] gap-6'> {/**border border-orange-800 */}
                        <div className='lg:w-1/2'> {/**border border-fuchsia-700 */}
                            {/**Service title */}
                            <h1 className='text-3xl font-sans font-bold text-[#003366] p-2 m-1'>{t("servicesPage.items.solarInverter.title")}</h1>

                            {/**Service description */}
                            <p className='font-sans text-[#333333] text-xl m-1 p-2'>{t("servicesPage.items.solarInverter.description")}</p>
                            <ul className='space-y-2 m-3'>
                                {
                                c.map((pt)=>{
                                    return(
                                        <li key={pt} className='font-sans text-[#004C99] text-xl'>
                                            {pt}
                                        </li>
                                    )
                                })
                            }
                            </ul>
                        </div>

                        <div className='lg:w-1/2'> {/*border border-yellow-800 */}
                            {/**Service image */}
                            <img src={solarInverter} alt="Solar Inverter" className='w-full h-full object-cover rounded-lg shadow-md'/>
                        </div>
                    </section>
                </div>
                
            </main>
        )
}

export default Services
