import { BottomTabHeaderProps, BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { AppText } from 'components/text/AppText';
import { ExtendedStackNavigationOptions } from 'expo-router/build/layouts/StackClient';
import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ITheme, useAppTheme } from 'theme/index';
import { BackButton } from './BackButton';

const CustomHeaderComponent = (props: NativeStackHeaderProps | BottomTabHeaderProps) => {
  const theme = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const insets = useSafeAreaInsets();
  const nameScreen = props?.options?.title;
  const headerLeft = props?.options?.headerLeft;
  const headerRight = props?.options?.headerRight;

  if (!nameScreen) return null;
  return <View style={[styles.container, { height: theme.dimensions.getHeightHeader, paddingTop: insets.top }]}>
    {headerLeft ? headerLeft({ canGoBack: true }) : <BackButton />}
    <View style={styles.viewTitle}>
      <AppText style={styles.textTitle}>{nameScreen}</AppText>
    </View>
    {headerRight ? headerRight({ canGoBack: true }) : <View style={{ width: headerLeft ? 0 : 24 }} />}
  </View>
}

export const CustomHeader = (): ExtendedStackNavigationOptions => {
  const headerOption: ExtendedStackNavigationOptions = {
    header: CustomHeaderComponent,
    presentation: 'card',
  };

  return headerOption
}

export const CustomBottomTabHeader = (): BottomTabNavigationOptions => {
  const headerOption: BottomTabNavigationOptions = {
    header: CustomHeaderComponent,
  };

  return headerOption
}

const createStyles = (theme: ITheme) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.dimensions.p16,
  },
  viewTitle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textTitle: {
    fontSize: theme.fontSize.p20,
    fontWeight: 'bold',
  },
});