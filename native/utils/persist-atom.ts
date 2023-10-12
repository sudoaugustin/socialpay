import * as SecureStore from 'expo-secure-store';
import { atom, onMount, onSet } from 'nanostores';

export default function persistAtom<T = string>(key: string, initial: T, effect?: (v: T) => void) {
  const $atom = atom<T>(initial);

  onSet($atom, ({ newValue }) => {
    effect?.(newValue);
    SecureStore.setItemAsync(key, JSON.stringify(newValue || ''));
  });

  onMount($atom, () => {
    SecureStore.getItemAsync(key).then((value) => {
      $atom.set(value === null ? value : JSON.parse(value));
    });
  });

  return $atom;
}
