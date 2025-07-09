import FontAwesome from '@expo/vector-icons/FontAwesome';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';

import { fonts } from 'assets/fonts';
import { AppToast } from 'components/toast/AppToast';
import QueryProvider from 'data/react-query/queryClient';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: fonts.SpaceMono,
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryProvider>
        <AppToast />
        <BottomSheetModalProvider>
          <ThemeProvider value={DefaultTheme}>
            <Stack>
              <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
              <Stack.Screen name='modal' options={{ presentation: 'modal' }} />
            </Stack>
          </ThemeProvider>
        </BottomSheetModalProvider>
      </QueryProvider>
    </GestureHandlerRootView>
  );
}
