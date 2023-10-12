import i18n from 'i18next';
import en from 'langs/en.json';
import mm from 'langs/mm.json';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: { translation: en },
  mm: { translation: mm },
};

i18n.use(initReactI18next).init({ lng: 'mm', resources, interpolation: { escapeValue: false }, compatibilityJSON: 'v3' });
