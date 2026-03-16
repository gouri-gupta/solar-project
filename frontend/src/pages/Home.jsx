import React from 'react'
import { useTranslation } from 'react-i18next';
import logo_cropped from "../assets/logo/logo_cropped.png"
import Footer from '../components/Footer';
import { RiMoneyRupeeCircleFill } from "react-icons/ri";       //saveMoney
import { GiEcology } from "react-icons/gi";                    //cleanEnergy
import { GiProgression } from "react-icons/gi";  //longTerm
import { FaChevronDown } from "react-icons/fa";

const Home = () => {
    const { t, i18n } = useTranslation();
    return (
        <main className=' bg-[#FFFFFF] '> {/*border border-black */}
            {/*Navbar will appear uniformly and globally on all the pages */}
            {/*Below the navbar there will be a hero section will will display Welcome to Sannishi Sun solutions along with a big logo */}
            {/*Then below the hero section there will be a section which displays what we offer/provide 
        Here there will be 3 cards which will display only text i.e Each card will display one of these 1.ROOFTOP SOLAR  2.SOLAR PANELS 3.SOLAR INVERTER with a hover effect*/}
            {/*Below this there will be a footer which will display COntact number of the business owner,again logo ,social media handles and the address Soni Complex, 
Behind Hotel Adarsh, 
Old Co on Market Road, 
Amrava . 444 601*/}

            {/*Hero section */}
            <section className=' flex items-center justify-between min-h-[70vh] px-8 flex-wrap'> {/*border border-blue-800 */}
                <div className=' w-3/5 '> {/* border border-green-800*/}
                    <h1 className='text-[#003366] text-3xl md:text-5xl lg:text-6xl font-bold italic mb-4'>{t("home.hero.welcome")}</h1>
                    <h1 className='text-[#004C99] text-lg md:text-xl lg:text-2xl italic font-semibold'>{t("home.hero.tagline")}</h1>
                </div>
                <div className=' w-2/5 flex justify-center'> {/* border border-red-900*/}
                    <img src={logo_cropped} alt="logo" className='max-w-[350px] w-full object-contain'/>
                </div>
            </section>

            {/*I want to add a down arrow here which is like bouncing and whenever user clicks on this arrow the page scrolls down ADD LATER */}

            <div className="flex justify-center mt-6">
                <a href="#whySolar">
                    <FaChevronDown className="text-3xl text-[#003366] animate-bounce cursor-pointer" />
                </a>
            </div>

            {/*Why solar */}
            <div id="whySolar" className=' flex flex-col items-center min-h-[50vh] justify-start font-sans'> {/*border border-black */}

                <section className=' m-4 h-1/3'> {/**border border-yellow-600 */}
                    <h1 className='text-[#003366] text-5xl  font-bold p-2'>{t("home.whySolar.title")}</h1>
                </section>
                
                {/**3 CARDS */}
                <div className='flex flex-row justify-evenly   h-2/3 w-full m-4 flex-wrap'>  {/*border border-rose-800 */}
                    {/*Block 1 */}
                    <section className='flex border border-[#E0E0E0] flex-col m-4 gap-3 items-center rounded-lg shadow-md hover:scale-110'>
                        <h1 className='m-2 text-3xl font-bold text-[#003366]'>{t("home.whySolar.cards.saveMoney.title")}</h1>
                        <div className=' text-4xl text-[#FDB813]'> {/*border border-gray-600 */}
                            <RiMoneyRupeeCircleFill></RiMoneyRupeeCircleFill>
                        </div>
                        <div className=' flex flex-col gap-2 items-center p-2'> {/*border border-black */}
                            <p className='text-xl text-[#004C99] font-semibold'>{t("home.whySolar.cards.saveMoney.point1")}</p>
                            <p className='text-xl text-[#004C99] font-semibold'>{t("home.whySolar.cards.saveMoney.point2")}</p>
                        </div>
                    </section>

                    {/*Block 2 */}
                    <section className=' flex border border-[#E0E0E0] flex-col m-4 gap-3 items-center rounded-lg shadow-md hover:scale-110 '>
                        <h1 className='m-2 text-3xl font-bold text-[#003366]'>{t("home.whySolar.cards.cleanEnergy.title")}</h1>
                        <div className=' text-4xl text-[#4CAF50]'> {/*border border-gray-600 */}
                            <GiEcology></GiEcology>
                        </div>
                        <div className=' flex flex-col gap-2 items-center p-2'> {/*border border-black */}
                            <p className='text-xl text-[#004C99] font-semibold'>{t("home.whySolar.cards.cleanEnergy.point1")}</p>
                            <p className='text-xl text-[#004C99] font-semibold'>{t("home.whySolar.cards.cleanEnergy.point2")}</p>
                        </div>
                    </section>

                    {/*Block 3*/}
                    <section className='flex border border-[#E0E0E0] flex-col m-4 gap-3 items-center rounded-lg shadow-md hover:scale-110'>
                        <h1 className='m-2 text-3xl font-bold text-[#003366] '>{t("home.whySolar.cards.longTerm.title")}</h1>
                        <div className=' text-4xl text-[#FDB813]'> {/*border border-gray-600 */}
                            <GiProgression></GiProgression>
                        </div>
                        <div className=' flex flex-col gap-2 items-center p-2'> {/*border border-black */}
                            <p className='text-xl text-[#004C99] font-semibold'>{t("home.whySolar.cards.longTerm.point1")}</p>
                            <p className='text-xl text-[#004C99] font-semibold'>{t("home.whySolar.cards.longTerm.point2")}</p>
                        </div>
                    </section>
                </div>
                
            </div>
            <hr />
            {/* What we offer */}
            <div className=' flex flex-col items-center min-h-[50vh] justify-start font-sans'> {/*border border-black */}
                
                
                <section className=' m-4 h-1/3'> {/*border border-red-700 */}
                    <h1 className='text-[#003366] text-6xl font-bold p-2'>{t("home.Offer.title")}</h1>
                </section>

                {/**Service cards */}
                <div className=' flex flex-row justify-evenly   h-2/3 w-full m-8 flex-wrap'> {/*border border-green-700 */}
                    {Object.keys(t("home.Offer.cards", { returnObjects: true })).map(
                        (cardKey) => ( 
                            <div key={cardKey} className='flex border border-[#E0E0E0] flex-col m-4 gap-3 items-center rounded-lg shadow-md hover:scale-110'>
                                <h2 className=' text-5xl font-bold text-[#003366] m-5 p-2'>{t(`home.Offer.cards.${cardKey}`)}</h2>
                            </div>
                        )
                    )}
                </div>
            </div>

        <Footer></Footer>
        </main>
    )
}

export default Home

/*
Why solar 
import { RiMoneyRupeeCircleFill } from "react-icons/ri";       saveMoney
import { GiEcology } from "react-icons/gi";                    cleanEnergy
import { GiProgression } from "react-icons/gi";  longTerm

*/
