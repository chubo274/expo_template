import { AppText } from 'components/text/AppText';
import React, { ReactNode } from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacityProps,
  ViewStyle,
  TextStyle,
} from 'react-native';

interface IAppButton extends TouchableOpacityProps {
  /** Text to display on button */
  title?: string;
  /** Icon to display on the left side of text */
  leftIcon?: ReactNode;
  /** Icon to display on the right side of text */
  rightIcon?: ReactNode;
  /** Loading state */
  loading?: boolean;
  /** Button disabled state */
  disabled?: boolean;
  /** Style for button container */
  buttonStyle?: ViewStyle;
  /** Style for text */
  textStyle?: TextStyle;
  /** Button variant */
  variant?: 'primary' | 'secondary' | 'outline';
}

export const AppButton = React.memo((props: IAppButton) => {
  const {
    title,
    leftIcon,
    rightIcon,
    loading = false,
    disabled = false,
    buttonStyle,
    textStyle,
    variant = 'primary',
    onPress,
    ...rest
  } = props;

  const styles = useStyles(variant, disabled);

  const isDisabled = disabled || loading;

  const handlePress = (event: any) => {
    if (!isDisabled && onPress) {
      onPress(event);
    }
  };

  return (
    <TouchableOpacity
      {...rest}
      style={[styles.container, buttonStyle]}
      onPress={handlePress}
      disabled={isDisabled}
      activeOpacity={isDisabled ? 1 : 0.7}
    >
      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator
            size='small'
            color={variant === 'outline' ? '#2f95dc' : '#ffffff'}
          />
        ) : (
          <>
            {leftIcon}

            {title && (
              <AppText style={[styles.text, textStyle]}>{title}</AppText>
            )}

            {rightIcon}
          </>
        )}
      </View>
    </TouchableOpacity>
  );
});

//! stylesheet
const useStyles = (
  variant: 'primary' | 'secondary' | 'outline',
  disabled: boolean
) => {
  // Color schemes by variant
  const getBackgroundColor = () => {
    if (disabled) return '#E5E5E5';

    switch (variant) {
      case 'primary':
        return '#2f95dc'; // blue primary
      case 'secondary':
        return '#ccc'; // gray secondary
      case 'outline':
        return 'transparent';
      default:
        return '#2f95dc';
    }
  };

  const getTextColor = () => {
    if (disabled) return '#9E9E9E';

    switch (variant) {
      case 'primary':
        return '#ffffff'; // white text on primary
      case 'secondary':
        return '#000000'; // black text on secondary
      case 'outline':
        return '#2f95dc'; // blue text on outline
      default:
        return '#ffffff';
    }
  };

  const getBorderColor = () => {
    if (disabled) return '#E5E5E5';
    return variant === 'outline' ? '#2f95dc' : 'transparent';
  };

  return StyleSheet.create({
    container: {
      backgroundColor: getBackgroundColor(),
      borderRadius: 8,
      borderWidth: variant === 'outline' ? 1 : 0,
      borderColor: getBorderColor(),
      opacity: disabled ? 0.6 : 1,
      paddingVertical: 12,
      paddingHorizontal: 20,
    },
    content: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      color: getTextColor(),
      fontSize: 14,
      fontWeight: '500',
      textAlign: 'center',
      marginHorizontal: 8,
    },
    leftIcon: {
      marginRight: 8,
    },
    rightIcon: {
      marginLeft: 8,
    },
  });
};
