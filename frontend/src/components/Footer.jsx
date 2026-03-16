import React from "react";
import { useTranslation } from "react-i18next";
import { FaFacebook, FaInstagram } from "react-icons/fa";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-[#003366] text-white mt-10">

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-8 py-10 flex flex-wrap justify-between gap-10">

        {/* Company Info */}
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold text-[#FDB813]">
            {t("footer.companyName")}
          </h2>
          <p className="text-sm">{t("footer.servingLine")}</p>
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">{t("footer.contactLabel")}</h3>
          <p>{t("footer.contactNumber")}</p>
        </div>

        {/* Address */}
        <div className="flex flex-col gap-2 max-w-[250px]">
          <h3 className="font-bold text-lg">{t("footer.addressLabel")}</h3>
          <p>{t("footer.address.line1")}</p>
          <p>{t("footer.address.line2")}</p>
          <p>{t("footer.address.line3")}</p>
        </div>

        {/* Social Media */}
        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">{t("footer.socialLabel")}</h3>

          <div className="flex gap-4 text-xl">
            <FaFacebook className="cursor-pointer hover:text-[#FDB813]" />
            <FaInstagram className="cursor-pointer hover:text-[#FDB813]" />
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#004C99] text-center py-4 text-sm">
        <p>
          <strong>{t("footer.gstinLabel")}:</strong> {t("footer.gstin")}
        </p>
      </div>

    </footer>
  );
};

export default Footer;