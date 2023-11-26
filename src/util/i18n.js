import i18n from "i18next";
import arTranslations from "public/locales/ar/common.json";
import enTranslations from "public/locales/en/common.json";
import frTranslations from "public/locales/fr/common.json";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
    resources: {
        en: enTranslations,

        ar: arTranslations,

        fr: frTranslations,
    },
    lng: "en", // Set the default language
    fallbackLng: "en",
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
