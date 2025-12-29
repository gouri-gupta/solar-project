import React from 'react'
import { useTranslation } from 'react-i18next';

const Services = () => {
    const { t, i18n } = useTranslation();
    const a = t("servicesPage.items.rooftopSolar.points",{ returnObjects: true });
    const b=t("servicesPage.items.solarPanels.points",{ returnObjects: true });
    const c=t("servicesPage.items.solarInverter.points",{ returnObjects: true });

        return (
            <>
                <h1>{t("servicesPage.title")}</h1>
                <h3>{t("servicesPage.subtitle")}</h3>

                <h1>{t("servicesPage.items.rooftopSolar.title")}</h1>
                <p>{t("servicesPage.items.rooftopSolar.description")}</p>
                <ul>
                    {
                    a.map((pt)=>{
                        return(
                            <li>
                                {pt}
                            </li>
                        )
                    })
                }
                </ul>


                <h1>{t("servicesPage.items.solarPanels.title")}</h1>
                <p>{t("servicesPage.items.solarPanels.description")}</p>
                <ul>
                    {
                    b.map((pt)=>{
                        return(
                            <li>
                                {pt}
                            </li>
                        )
                    })
                }
                </ul>


                 <h1>{t("servicesPage.items.solarInverter.title")}</h1>
                <p>{t("servicesPage.items.solarInverter.description")}</p>
                <ul>
                    {
                    c.map((pt)=>{
                        return(
                            <li>
                                {pt}
                            </li>
                        )
                    })
                }
                </ul>
                
            </>
        )
}

export default Services
