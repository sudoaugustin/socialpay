import SVG, { Line, SvgProps } from 'react-native-svg';

export default function Dash(props: SvgProps) {
  return (
    <SVG {...props} viewBox='0 0 100 1' fill='none'>
      <Line x1='0.514282' y1='0.5' x2='100.514' y2='0.5' stroke='black' stroke-dasharray='10 10' />
    </SVG>
  );
}
