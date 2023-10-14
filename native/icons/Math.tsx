import { Path, Svg, SvgProps } from 'react-native-svg';

export function AddCircleIcon(props: SvgProps) {
  return (
    <Svg viewBox='0 0 20 20' {...props}>
      <Path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v2.5h-2.5a.75.75 0 000 1.5h2.5v2.5a.75.75 0 001.5 0v-2.5h2.5a.75.75 0 000-1.5h-2.5v-2.5z'
      />
    </Svg>
  );
}

export function MinusCircleIcon(props: SvgProps) {
  return (
    <Svg viewBox='0 0 20 20' {...props}>
      <Path
        d='M10 18a8 8 0 100-16 8 8 0 000 16zM6.75 9.25a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5z'
        clipRule='evenodd'
        fillRule='evenodd'
      />
    </Svg>
  );
}
