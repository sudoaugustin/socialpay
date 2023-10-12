import { MotiView } from 'moti';
import type { ViewProps } from 'react-native';

type Props = ViewProps & {
  x?: number;
  y?: number;
};

export default function Motion({ x = 0, y = 0, children, ...rest }: Props) {
  return (
    <MotiView {...rest} from={{ opacity: 0.85, translateX: x, translateY: y }} animate={{ opacity: 1, translateX: 0, translateY: 0 }}>
      {children}
    </MotiView>
  );
}
