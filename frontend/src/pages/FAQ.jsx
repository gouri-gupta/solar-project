import {useEffect} from 'react'
import { useTranslation } from 'react-i18next';
import { initFlowbite } from 'flowbite'

const FAQ = () => {
    const { t } = useTranslation();
    const a = t("faqPage.items",{ returnObjects: true });

    useEffect(() => {
        initFlowbite()
    }, [])

    return (
        <main className='flex flex-col gap-4'>
            <div className=' m-4'> {/**border border-black */}
                <h1 className='text-[#003366] text-3xl md:text-5xl lg:text-6xl font-bold italic m-4'>{t("faqPage.title")}</h1>
            </div>

            <div id="accordion-card" data-accordion="open" className=' m-4 flex flex-col gap-4'> {/*border border-black */}

                {a.map((item,index)=>{
                    return(
                        <div key={index} className=' border-gray-200 hover:border-[#FDB813]'> {/* border border-green-800*/}
                            <h2 id={`accordion-card-heading-${index}`}>
                                <button
                                    type="button"
                                    className="flex items-center justify-between w-full p-5 font-medium border rounded-xl transition hover:bg-gray-50 [&[aria-expanded='true']_svg]:rotate-180"
                                    data-accordion-target={`#accordion-card-body-${index}`}
                                    aria-expanded="false"
                                    aria-controls={`accordion-card-body-${index}`}
                                >
                                    <span className='text-xl font-sans font-bold text-[#003366] p-2'>{item.question}</span>

                                    <svg
                                        data-accordion-icon
                                        className="w-5 h-5 shrink-0 transition-transform duration-300"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m5 15 7-7 7 7"/>
                                    </svg>

                                </button>
                            </h2>

                            <div
                                id={`accordion-card-body-${index}`}
                                className="hidden"
                                aria-labelledby={`accordion-card-heading-${index}`}
                            >
                                <div className="p-4">
                                    <p className='font-sans text-[#004C99] text-base p-2'>{item.answer}</p>
                                </div>
                            </div>

                        </div>
                    )
                })}

            </div>

            <div className='m-4'>
                <h2 className='text-2xl font-bold font-sans text-[#004C99] italic'>{t("faqPage.contact.line1")}</h2>
                <h2 className='text-2xl font-bold font-sans text-[#004C99] italic'>{t("faqPage.contact.line2")}</h2>
            </div>
        </main>
    )
}

export default FAQ