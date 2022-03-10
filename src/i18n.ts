import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

const i18n = i18next
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init(
    {
      lng: navigator.language,
      fallbackLng: 'en-US',
      backend: {
        loadPath: "/locales/{{lng}}/{{ns}}.json",
      },
      load: 'currentOnly',
      detection: {
        order: ['querystring', 'localStorage', 'navigator'],
        caches: ['localStorage'],
        lookupQuerystring: 'language',
        lookupLocalStorage: 'language',
      },      
      react: { 
        useSuspense: false
      },
      interpolation: {
        escapeValue: false,
      },
    },
    (error, t) => {
      if (error) {
        console.error('i18n init error:', error)
      }
    }
  );

export default i18n;