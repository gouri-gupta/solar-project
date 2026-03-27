import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom';



const Contact = () => {
    const { t, i18n } = useTranslation();
    return (
        <main className=' flex flex-col m-8 gap-8'> {/**border border-black */}

            {/**Title section */}
            <section className=' flex flex-col items-center text-center'> {/**border border-b-rose-900 */}
                <h1 className="text-[#003366] text-4xl md:text-5xl lg:text-6xl font-bold italic p-2">{t("contact")}</h1>
                <p className="text-[#004C99] text-lg md:text-xl lg:text-2xl italic font-semibold p-2">{t("customerPortal.subtitle")}</p>
            </section>

            {/* Call support line */}
            <div className="text-center bg-blue-50 border border-blue-200 rounded-lg p-3 md:p-4 shadow-sm">
                <p className="text-[#003366] text-base md:text-lg font-medium">
                    📞 {t("customerPortal.callLine")}{" "}
                    <a href="tel:9422918612" className="underline font-bold hover:text-blue-700">
                        9422918612
                    </a>
                </p>
            </div>


            {/*Tiles for various features of customer portal*/}
            <section className=' grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'> {/**border border-orange-800 */}
                <Link to="/contact/requestservice">
                    <div className='border border-transparent w-full h-full  p-2 flex flex-col justify-center bg-[#FDB813] rounded-lg shadow-md text-[#003366]  hover:bg-[#003366] hover:text-white hover:border-white transition hover:scale-110'>
                        <h1 className='text-center font-bold text-xl'> 
                            ⚡{t("customerPortal.requestService.title")}
                                <p className='font-normal text-lg italic'>{t("customerPortal.requestService.description")}</p>
                        </h1>
                    </div>
                </Link>

                <Link to="/contact/sitevisit">
                    <div className='border border-transparent w-full h-full  p-2 flex flex-col justify-center bg-[#FDB813] rounded-lg shadow-md text-[#003366]  hover:bg-[#003366] hover:text-white hover:border-white transition hover:scale-110'>
                        <h1 className='text-center font-bold text-xl'> 
                            📍{t("customerPortal.siteVisit.title")}
                                <p className='font-normal text-lg italic'>{t("customerPortal.siteVisit.description")}</p>
                        </h1>
                    </div>
                </Link>

                <Link to="/contact/installedproject">
                    <div className='border border-transparent w-full h-full p-2 flex flex-col justify-center bg-[#FDB813] rounded-lg shadow-md text-[#003366]  hover:bg-[#003366] hover:text-white hover:border-white transition hover:scale-110'>
                        <h1 className='text-center font-bold text-xl'> 
                            🔧{t("customerPortal.existingQuery.title")}
                                <p className='font-normal text-lg italic'>{t("customerPortal.existingQuery.description")}</p>
                        </h1>
                    </div>
                </Link>

                <a href="/sannidhi-sun-solution-visiting-card.pdf" download className='text-center font-bold text-xl'>
                    <div className='border border-transparent w-full h-full p-2 flex flex-col justify-center bg-[#FDB813] rounded-lg shadow-md text-[#003366]  hover:bg-[#003366] hover:text-white hover:border-white transition hover:scale-110'>
                        {/*<h1>{t("customerPortal.visitingCard.title")}</h1>*/}
                            <button className=''>📄{t("customerPortal.visitingCard.download")}</button>                      
                    </div>
                </a>
            </section>

            {/*
            <div>
                <h1>{t("customerPortal.payment.title")}</h1> 
            </div>

            <div>
                <h1>{t("customerPortal.receipt.title")}</h1> 
            </div>
            */}


        </main>
    )
}

export default Contact
