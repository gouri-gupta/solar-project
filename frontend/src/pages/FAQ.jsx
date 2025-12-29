import React from 'react'
import { useTranslation } from 'react-i18next';

const FAQ = () => {
    const { t, i18n } = useTranslation();
    const a = t("faqPage.items",{ returnObjects: true });
        return (
            <>
                <h1>{t("faqPage.title")}</h1>
                {
                    a.map((item)=>{
                        return(
                            <div>
                                <h3>{item.question}</h3>
                                <p>{item.answer}</p>
                            </div>
                        )
                    })
                }
            </>
        )
}

export default FAQ
