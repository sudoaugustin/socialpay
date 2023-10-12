import { atom } from 'nanostores';
import { Popup, Toast } from 'types/layout';

export const $toast = atom<Toast | undefined>();

export const $popup = atom<Popup | undefined>();

export const $fetching = atom<boolean>(false);

$toast.subscribe((value) => {
  if (value) {
    setTimeout(() => {
      $toast.set(undefined);
    }, 5000);
  }
});
