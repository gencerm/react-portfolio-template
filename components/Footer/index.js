import React, { useState } from "react";
import Button from "../Button"; // Button bileşeninin yolu
import ContactModal from "../ContactModal"; // ContactModal bileşeninin yolu
import data from "../../data/portfolio.json"; // portfolio.json dosyasının yolu
import { useLanguage } from "../../context/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <>
      <div className="mt-10 laptop:mt-40 p-2 laptop:p-0">
        <h1 className="tablet:m-10 text-2xl text-bold">{t("footer.contactHeading")}</h1>
        <div className="tablet:m-10 mt-2 text-xl laptop:text-3xl w-full laptop:w-3/5">
          <p>{t("footer.readyToConnect")}</p>
          <div className="mt-5">
            <Button type="primary" onClick={() => setIsContactModalOpen(true)}>
              {t("common.getInTouch")}
            </Button>
          </div>
        </div>
        <div className="mt-10">
          <p className="text-center text-sm opacity-50">
            {t("footer.copyright", { year: new Date().getFullYear(), name: data.name })}
          </p>
           <a href="https://github.com/chetanverma16/react-portfolio-template" className="text-center text-xs opacity-50 align-middle block mt-1" target="_blank" rel="noopener noreferrer">
            {t("footer.attribution")}
          </a>
        </div>
      </div>
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </>
  );
};

export default Footer;