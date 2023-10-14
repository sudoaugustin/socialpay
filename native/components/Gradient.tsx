import { LinearGradient, LinearGradientProps } from 'expo-linear-gradient';
import useIsDark from 'hooks/useIsDark';

export default function Gradient(props: Omit<LinearGradientProps, 'colors'>) {
  const isDark = useIsDark();
  return <LinearGradient {...props} colors={isDark ? ['#0284c7', '#075985'] : ['#0EA5E9', '#3678DD']} />;
}
