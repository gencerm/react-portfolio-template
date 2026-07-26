import React, { createContext, useContext, useEffect, useState } from "react";
import translations from "../data/translations";

const LANGUAGE_STORAGE_KEY = "language";
const DEFAULT_LANG = "tr";

const LanguageContext = createContext({
  lang: DEFAULT_LANG,
  setLang: () => {},
  t: (key) => key,
});

export const LanguageProvider = ({ children }) => {
  // Sunucu her zaman DEFAULT_LANG render eder (localStorage sunucuda yok).
  // useEffect yalnızca client'ta, hydration bittikten sonra çalışır — o zaman
  // localStorage'a bakıp gerçek tercihi uygularız. next-themes'in ThemeProvider'ı
  // ile aynı desen (bkz. pages/_app.js, components/Header, pages/bio.js).
  const [lang, setLangState] = useState(DEFAULT_LANG);

  useEffect(() => {
    const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (stored === "tr" || stored === "en") {
      setLangState(stored);
    }
  }, []);

  const setLang = (newLang) => {
    setLangState(newLang);
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, newLang);
  };

  // t(key, vars?) — sözlükten UI metni çeker.
  // vars verilirse şablondaki "{isim}" yer tutucularını değiştirir,
  // örn: t("footer.copyright", { year: 2026, name: "Esra" })
  const t = (key, vars) => {
    const entry = translations[key];
    const template = entry ? entry[lang] ?? entry[DEFAULT_LANG] ?? key : key;
    if (!vars) return template;
    return template.replace(/\{(\w+)\}/g, (_, name) =>
      vars[name] !== undefined ? vars[name] : `{${name}}`
    );
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

export default LanguageContext;
