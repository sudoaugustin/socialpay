import i18next from 'i18next';
import persistAtom from 'utils/persist-atom';

export const $lang = persistAtom<Lang>('lang', 'en', (newValue) => i18next.changeLanguage(newValue));

export const $token = persistAtom<string>('token');
