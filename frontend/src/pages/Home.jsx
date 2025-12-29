import React from 'react'
import { useTranslation } from 'react-i18next';
import Footer from '../components/Footer';

const Home = () => {
    const { t, i18n } = useTranslation();
    return (
        <>
            {/*Navbar will appear uniformly and globally on all the pages */}
            {/*Below the navbar there will be a hero section will will display Welcome to Sannishi Sun solutions along with a big logo */}
            {/*Then below the hero section there will be a section which displays what we offer/provide 
        Here there will be 3 cards which will display only text i.e Each card will display one of these 1.ROOFTOP SOLAR  2.SOLAR PANELS 3.SOLAR INVERTER with a hover effect*/}
            {/*Below this there will be a footer which will display COntact number of the business owner,again logo ,social media handles and the address Soni Complex, 
Behind Hotel Adarsh, 
Old Co on Market Road, 
Amrava . 444 601*/}

            {/*Hero section */}
            <h1>{t("home.hero.welcome")}</h1>
            <h1>{t("home.hero.tagline")}</h1>

            {/*Why solar */}
            <div>
                <h1>{t("home.whySolar.title")}</h1>
                <section>
                    <h1>{t("home.whySolar.cards.saveMoney.title")}</h1>
                    <p>{t("home.whySolar.cards.saveMoney.point1")}</p>
                    <p>{t("home.whySolar.cards.saveMoney.point2")}</p>
                </section>
                <section>
                    <h1>{t("home.whySolar.cards.cleanEnergy.title")}</h1>
                    <p>{t("home.whySolar.cards.cleanEnergy.point1")}</p>
                    <p>{t("home.whySolar.cards.cleanEnergy.point2")}</p>
                </section>
                <section>
                    <h1>{t("home.whySolar.cards.longTerm.title")}</h1>
                    <p>{t("home.whySolar.cards.longTerm.point1")}</p>
                    <p>{t("home.whySolar.cards.longTerm.point2")}</p>
                </section>
            </div>

            {/* What we offer */}
            <div>
                <h1>{t("home.Offer.title")}</h1>

                <div>
                    {Object.keys(t("home.Offer.cards", { returnObjects: true })).map(
                        (cardKey) => (
                            <div key={cardKey}>
                                <h2>{t(`home.Offer.cards.${cardKey}`)}</h2>
                            </div>
                        )
                    )}
                </div>
            </div>

        <Footer></Footer>
        </>
    )
}

export default Home
