import { CustomHeader } from 'components/navigation/CustomHeader';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { configureLocalization, fallBackLanguage } from 'localization/index';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ThemeProvider from 'theme/index';
import ZustandPersist from 'zustand/persist';

export default function RootLayout() {
  const customHeaderOptions = CustomHeader();

  useEffect(() => {
    const savedLanguage = ZustandPersist.getState()?.Localization || fallBackLanguage;
    configureLocalization(savedLanguage);
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <Stack initialRouteName="index">
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="OnBoardingScreen" options={{ headerShown: false }} />
          <Stack.Screen name="SigninStack" options={{ headerShown: false }} />
          <Stack.Screen
            name="DetailToDoScreen"
            options={{ ...customHeaderOptions, headerTitle: 'Detail To Do' }}
          />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
