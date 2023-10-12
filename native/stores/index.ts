import i18next from 'i18next';
import persistAtom from 'utils/persist-atom';

export const $user = persistAtom<User | undefined>('user', undefined);

export const $lang = persistAtom<Lang>('lang', 'en', (newValue) => i18next.changeLanguage(newValue));

export const $token = persistAtom<null | string | undefined>('token', undefined);

export const $isDark = persistAtom<boolean>('dark', false);
