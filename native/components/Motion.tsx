import { MotiView } from 'moti';
import type { ViewProps } from 'react-native';

type Props = ViewProps & {
  x?: number;
  y?: number;
  o?: number;
};

export default function Motion({ o = 0.85, x = 0, y = 0, children, ...rest }: Props) {
  return (
    <MotiView {...rest} from={{ opacity: o, translateX: x, translateY: y }} animate={{ opacity: 1, translateX: 0, translateY: 0 }}>
      {children}
    </MotiView>
  );
}
