import { FontName } from 'assets/fonts';
import React, { ReactNode } from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';

interface IAppText extends TextProps {
  children: string | ReactNode;
  /** Font family to use */
  fontFamily?: FontName;
}

export const AppText = React.memo((props: IAppText) => {
  const { children, fontFamily = FontName.SpaceMono, style, ...rest } = props;

  const styles = useStyles(fontFamily);

  return (
    <Text
      allowFontScaling={false}
      {...rest}
      style={[styles.defaultStyle, style]}
    >
      {children}
    </Text>
  );
});

const useStyles = (fontFamily: FontName) =>
  StyleSheet.create({
    defaultStyle: {
      fontSize: 12,
      color: 'black',
      fontFamily,
      fontWeight: 400,
    },
  });
