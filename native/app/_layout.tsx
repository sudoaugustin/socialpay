import {
  Manrope_200ExtraLight,
  Manrope_300Light,
  Manrope_400Regular,
  Manrope_500Medium,
  Manrope_600SemiBold,
  Manrope_700Bold,
  Manrope_800ExtraBold,
} from '@expo-google-fonts/manrope';
import { useFonts } from 'expo-font';
import { Slot, SplashScreen } from 'expo-router';
import Sheet from 'layouts/Sheet';
import Toast from 'layouts/Toast';
import { View } from 'moti';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { $lang } from 'stores';
import { $theme } from 'stores/layout';
import 'utils/i18n';

SplashScreen.preventAutoHideAsync();

// Need to load all local stoted atoms
$lang.get();
$theme.get();

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    sans_200: Manrope_200ExtraLight,
    sans_300: Manrope_300Light,
    sans_400: Manrope_400Regular,
    sans_500: Manrope_500Medium,
    sans_600: Manrope_600SemiBold,
    sans_700: Manrope_700Bold,
    sans_800: Manrope_800ExtraBold,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  return (
    <SafeAreaProvider>
      {fontsLoaded ? (
        <View className='bg-white dark:bg-slate-950'>
          <Slot />
          <Toast />
          <Sheet />
        </View>
      ) : null}
    </SafeAreaProvider>
  );
}

export { ErrorBoundary } from 'expo-router';
