import 'i18next';
import en from 'langs/en.json';
import mm from 'langs/mm.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'en';
    resources: {
      en: typeof en;
      mm: typeof mm;
    };
  }
}
