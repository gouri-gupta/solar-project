import React from 'react'
import { useTranslation } from 'react-i18next'

const WallOfTrust = () => {
     const { t, i18n } = useTranslation();
    return (
        <div>
            <h1>{t("wallOfTrust")}</h1>
            <h3>{t("wotPage.subtitle")}</h3>
        </div>
    )
}

export default WallOfTrust
