import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom';



const Contact = () => {
    const { t, i18n } = useTranslation();
    return (
        <>
            <h1>{t("contact")}</h1>
            <p>{t("customerPortal.subtitle")}</p>

            {/*Add description to each of the below cards */}

            <div>
                <h1> <Link to="/contact/requestservice">{t("customerPortal.requestService.title")}</Link></h1>
                <p>{t("customerPortal.requestService.description")}</p>
            </div>

            <div>
                <h1> <Link to="/contact/sitevisit">{t("customerPortal.siteVisit.title")}</Link></h1>
                <p>{t("customerPortal.siteVisit.description")}</p>
            </div>

            <div>
                <h1> <Link to="/contact/installedproject">{t("customerPortal.existingQuery.title")}</Link></h1>
                <p>{t("customerPortal.existingQuery.description")}</p>
            </div>

            <div>
                <h1>{t("customerPortal.visitingCard.title")}</h1>
                <a href="/sannidhi-sun-solution-visiting-card.pdf" download>
                    <button>{t("customerPortal.visitingCard.download")}</button>
                </a>

                
            </div>

            <div>
                <h1>{t("customerPortal.payment.title")}</h1> {/* Do later */}
            </div>

            <div>
                <h1>{t("customerPortal.receipt.title")}</h1> {/* Do later */}
            </div>


        </>
    )
}

export default Contact
