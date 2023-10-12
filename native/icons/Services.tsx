import { Path, Svg, SvgProps } from 'react-native-svg';

export function Topup(props: SvgProps) {
  return (
    <Svg viewBox='0 0 24 24' strokeWidth={1.5} {...props}>
      <Path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3'
      />
    </Svg>
  );
}

export function Banks(props: SvgProps) {
  return (
    <Svg viewBox='0 0 24 24' strokeWidth={1.5} {...props}>
      <Path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z'
      />
    </Svg>
  );
}

export function Bills(props: SvgProps) {
  return (
    <Svg viewBox='0 0 24 24' strokeWidth={1.5} {...props}>
      <Path strokeLinecap='round' strokeLinejoin='round' d='M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z' />
    </Svg>
  );
}

export function Taxes(props: SvgProps) {
  return (
    <Svg viewBox='0 0 24 24' strokeWidth={1.5} {...props}>
      <Path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185zM9.75 9h.008v.008H9.75V9zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 4.5h.008v.008h-.008V13.5zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
      />
    </Svg>
  );
}
