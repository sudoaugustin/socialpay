import 'i18next';
import bm from 'langs/bm.json';
import en from 'langs/en.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'en';
    resources: {
      en: typeof en;
      bm: typeof bm;
    };
  }
}
