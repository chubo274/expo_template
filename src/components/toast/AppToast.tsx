import { AppImage } from 'components/image';
import { AppText } from 'components/text/AppText';
import { EmitType } from 'constants/Constant';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  DeviceEventEmitter,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';
import ImageSource from 'src/assets/images';

export interface IAppToast {
  type?: 'Error' | 'Warning' | 'Success' | 'Info';
  toastMessage?: string;
  numberOfLines?: number;
  onPress?: () => void;
}
const deviceWidth = Dimensions.get('window').width;

export const AppToast = React.memo((props: IAppToast) => {
  const inset = useSafeAreaInsets();
  const styles = useStyles(inset);
  const [showToast, setShowToast] = useState(false);
  const [toastConfig, setToastConfig] = useState<IAppToast>({});
  const {
    type = 'Success',
    toastMessage = '',
    numberOfLines = 2,
    onPress,
  } = useMemo(() => toastConfig, [toastConfig]);
  const isToast = useRef(false);

  const _emitShowToast = useCallback((params: IAppToast) => {
    if (!isToast.current) {
      isToast.current = true;
      setToastConfig(params);
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        isToast.current = false;
      }, 3000);
    }
  }, []);

  const _color = useMemo(() => {
    switch (type) {
      case 'Error':
        return '#aa3030';
      case 'Info':
        return '#5E8AD2';
      case 'Warning':
        return '#957a43';
      case 'Success':
      default:
        return '#584827';
    }
  }, [type]);

  const pressInToast = useCallback(() => {
    setShowToast(false);
  }, []);

  const pressOnIconRight = useCallback(() => {
    setShowToast(false);
    onPress?.();
  }, [onPress]);

  // render
  const renderIconLeft = useCallback(() => {
    let source = '';
    switch (type) {
      case 'Error':
        source = ImageSource.mage_box_3d_cross_fill;
        break;
      case 'Info':
        source = ImageSource.lets_icons_order_light;
        break;
      case 'Warning':
        source = ImageSource.si_warning_fill;
        break;
      case 'Success':
      default:
        source = ImageSource.icon_park_solid_check_one;
        break;
    }
    return (
      <View style={{ marginRight: 8 }}>
        <AppImage source={source} style={{ width: 24, aspectRatio: 1 }} />
      </View>
    );
  }, [type]);

  const renderIconRight = useCallback(() => {
    if (!onPress) return null;
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={pressOnIconRight}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        style={{
          backgroundColor: _color,
          paddingHorizontal: 16,
          paddingVertical: 12,
          borderRadius: 100,
        }}
      >
        <AppText style={{ color: '#FFFFFF' }}>{'view'}</AppText>
      </TouchableOpacity>
    );
  }, [_color, onPress, pressOnIconRight]);

  // effect
  useEffect(() => {
    const subscription = DeviceEventEmitter.addListener(
      EmitType.AppToast,
      (params: IAppToast) => {
        _emitShowToast(params);
      }
    );
    return () => {
      subscription?.remove();
    };
  }, [showToast, _emitShowToast]);

  if (!showToast) return null;
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.toastContainer}
      onPress={pressInToast}
    >
      {renderIconLeft()}
      <View style={{ marginRight: 8 }}>
        <AppText
          numberOfLines={numberOfLines}
          style={[styles.textToastMessage, { color: _color }]}
        >
          {toastMessage}
        </AppText>
      </View>
      {renderIconRight()}
    </TouchableOpacity>
  );
});

const useStyles = (inset: EdgeInsets) =>
  StyleSheet.create({
    toastContainer: {
      zIndex: 9999,
      position: 'absolute',
      top: inset.top + 16,
      alignSelf: 'center',
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 100,
      borderColor: '#CBD5E1',
      borderWidth: 1,
      backgroundColor: '#FFFFFF',
      paddingHorizontal: 16,
      paddingVertical: 8,
      maxWidth: deviceWidth - 16 * 2,
      justifyContent: 'center',
    },
    textToastMessage: {},
  });
