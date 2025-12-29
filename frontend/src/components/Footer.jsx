import React from "react";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer>
      <h2>{t("footer.companyName")}</h2>
      <p>{t("footer.servingLine")}</p>

      <p>
        <strong>{t("footer.contactLabel")}:</strong>{" "}
        {t("footer.contactNumber")}
      </p>

      <p>
        <strong>{t("footer.addressLabel")}:</strong>
        <br />
        {t("footer.address.line1")}
        <br />
        {t("footer.address.line2")}
        <br />
        {t("footer.address.line3")}
      </p>

      <p>
        <strong>{t("footer.socialLabel")}:</strong>
        <br />
        {t("footer.social.facebook")}
        <br />
        {t("footer.social.instagram")}
      </p>

      <p>
        <strong>{t("footer.gstinLabel")}:</strong>{" "}
        {t("footer.gstin")}
      </p>
    </footer>
  );
};

export default Footer;
