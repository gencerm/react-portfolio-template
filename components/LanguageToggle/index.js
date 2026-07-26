import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import data from "../../data/portfolio.json";

// TR/ENG pil şeklinde dil değiştirici — header'ın diğer butonlarıyla aynı
// boyut/hover davranışını taşır ama iki segmentli aktif/pasif durumu
// generic Button bileşeninde olmadığı için ayrı bir bileşen.
// "TR"/"ENG" etiketleri kasıtlı olarak çevrilmiyor: bir dil anahtarı her
// zaman kendi dilinin kısaltmasını gösterir.
const LanguageToggle = () => {
  const { lang, setLang, t } = useLanguage();

  return (
    <div
      className={`flex items-center m-1 laptop:m-2 rounded-lg border border-gray-300 dark:border-white/20 text-sm tablet:text-base overflow-hidden link ${
        data.showCursor && "cursor-none"
      }`}
      role="group"
      aria-label={t("languageToggle.ariaLabel")}
    >
      {["tr", "en"].map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
          className={`px-2 py-1 transition-all duration-300 ease-out ${
            lang === code
              ? "bg-black text-white dark:bg-white dark:text-black"
              : "opacity-50 hover:opacity-100"
          }`}
        >
          {code === "tr" ? "TR" : "ENG"}
        </button>
      ))}
    </div>
  );
};

export default LanguageToggle;
