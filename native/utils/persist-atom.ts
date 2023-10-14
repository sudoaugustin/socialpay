import * as SecureStore from 'expo-secure-store';
import { atom, onMount, onSet } from 'nanostores';

export default function persistAtom<T = string>(key: string, initial?: T, effect?: (v?: T) => void) {
  const $atom = atom<T | undefined>(initial);

  onSet($atom, ({ newValue }) => {
    effect?.(newValue);
    SecureStore.setItemAsync(key, JSON.stringify(newValue || ''));
  });

  onMount($atom, () => {
    SecureStore.getItemAsync(key).then((value) => {
      $atom.set(value ? JSON.parse(value) : initial || '');
    });
  });

  return $atom;
}
