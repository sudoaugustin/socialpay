const colors = require('tailwindcss/colors');
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    './app/**/*.{ts,tsx}',
    './utils/**/*.{ts,tsx}',
    './icons/**/*.{ts,tsx}',
    './views/**/*.{ts,tsx}',
    './layouts/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: { colors: { brand: colors.sky, error: colors.red } },
    fontFamily: {
      'sans-thin': ['sans_200'],
      'sans-light': ['sans_300'],
      sans: ['sans_400'],
      'sans-medium': ['sans_500'],
      'sans-semibold': ['sans_600'],
      'sans-bold': ['sans_700'],
      'sans-extrabold': ['sans_800'],
    },
    fontWeight: {},
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.flex-center': {
          'align-items': 'center',
          'justify-content': 'center',
        },
      });
    }),
  ],
};
