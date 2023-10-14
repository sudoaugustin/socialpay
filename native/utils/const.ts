import Constants from 'expo-constants';
import { Easing } from 'react-native';

export const langs = [
  { label: 'EN', value: 'en' },
  { label: 'ဗမာ', value: 'bm' },
  { label: 'တႆး', value: 'sh' },
  { label: '日本語', value: 'jp' },
];

export const themes = ['dark', 'light', 'system'];

export const easings = {
  linear: Easing.bezier(0, 0.6, 0, 0.6),
};

export const banks = {
  CB: {
    image: require('assets/images/banks/CB.png'),
    colors: ['#F3C63C', '#EF565E'],
  },
  AYA: {
    image: require('assets/images/banks/AYA.png'),
    colors: ['#ff3e1d', '#A5000B'],
  },
  KBZ: {
    image: require('assets/images/banks/KBZ.png'),
    colors: ['#0057ab', '#0000AB'],
  },
};

export const $package = Constants.manifest2?.extra?.expoClient?.android?.package || 'host.exp.exponent';
