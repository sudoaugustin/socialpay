import { useColorScheme } from 'nativewind';

export default function useIsDark() {
  const { colorScheme } = useColorScheme();
  return colorScheme === 'dark';
}
