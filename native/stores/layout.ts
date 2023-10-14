import { atom } from 'nanostores';
import { NativeWindStyleSheet } from 'nativewind';
import { Sheet, Toast } from 'types/layout';
import persistAtom from 'utils/persist-atom';

export const $toast = atom<Toast | undefined>();

export const $sheet = atom<Sheet | undefined>();

export const $theme = persistAtom<'dark' | 'light' | 'system'>(
  'theme',
  'system',
  (theme) => theme && NativeWindStyleSheet.setColorScheme(theme),
);

$toast.subscribe((value) => {
  if (value) {
    setTimeout(() => {
      $toast.set(undefined);
    }, 2500);
  }
});
