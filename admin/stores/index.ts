import { persistentAtom } from '@nanostores/persistent';

export const $token = persistentAtom<string>('');
