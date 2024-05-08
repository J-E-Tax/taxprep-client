import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './locales/enTranslation.json';
import translationZH from './locales/zhTranslation.json';
import translationES from './locales/esTranslation.json';

console.log(`Current language: ${i18n.language}`);


const resources = {
    en: {
        translation: translationEN
    },
    zh: {
        translation: translationZH
    },
    es: {
        translation: translationES
    }
    };

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: "en", // This is the default language
        // keySeparator: false,
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;