import { Path, Svg, SvgProps } from 'react-native-svg';

export function ChevronIcon(props: SvgProps) {
  return (
    <Svg viewBox='0 0 20 20' {...props}>
      <Path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z'
      />
    </Svg>
  );
}

export function ChevronUpDownIcon(props: SvgProps) {
  return (
    <Svg viewBox='0 0 20 20' {...props}>
      <Path
        fillRule='evenodd'
        d='M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z'
        clipRule='evenodd'
      />
    </Svg>
  );
}
