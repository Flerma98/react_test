// i18n.js
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        resources: {
            en: {
                translation: require('./locales/en/translation.json'),
            },
            es: {
                translation: require('./locales/es/translation.json'),
            }
        },
        fallbackLng: 'es',
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
