import i18n from 'i18next';
import bm from 'langs/bm.json';
import en from 'langs/en.json';
import jp from 'langs/jp.json';
import sh from 'langs/sh.json';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: { translation: en },
  bm: { translation: bm },
  sh: { translation: sh },
  jp: { translation: jp },
};

i18n.use(initReactI18next).init({ lng: 'bm', resources, interpolation: { escapeValue: false }, compatibilityJSON: 'v3' });
