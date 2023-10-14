import { Path, Svg, SvgProps } from 'react-native-svg';

export function CloseIcon(props: SvgProps) {
  return (
    <Svg fill='none' viewBox='0 0 24 24' {...props}>
      <Path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
    </Svg>
  );
}

export function CloseCircleIcon(props: SvgProps) {
  return (
    <Svg fill='currentColor' viewBox='0 0 20 20' {...props}>
      <Path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z'
      />
    </Svg>
  );
}
