import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetModalProps,
  SNAP_POINT_TYPE,
} from '@gorhom/bottom-sheet';
import React, { useCallback, useRef } from 'react';
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native';
import { SharedValue } from 'react-native-reanimated';

interface IProps extends Omit<BottomSheetModalProps, 'onClose'> {
  snapPoints: Array<string | number> | SharedValue<Array<string | number>>;
  backdropOpacity?: number;
  onOpen?: () => void;
  onClose?: () => void;
}

export const AppModal = React.memo(
  React.forwardRef(
    (props: IProps, ref: React.ForwardedRef<BottomSheetModal | null>) => {
      const { backdropOpacity, onOpen, onClose, onChange, ...rest } = props;
      const currentSnapIndex = useRef<number>(-1); // Track current index

      const close = useCallback(() => {
        Keyboard.dismiss();
      }, []);

      const onChangeSnapPoint = useCallback(
        (index: number, position: number, type: SNAP_POINT_TYPE) => {
          const hasOpened = currentSnapIndex.current === -1 && index >= 0;
          const hasClosed = currentSnapIndex.current >= 0 && index === -1;
          // const hasClosed = index === -1;

          if (hasOpened) onOpen?.();
          if (hasClosed) {
            Keyboard.dismiss();
            onClose?.();
          }
          onChange?.(index, position, type);
          currentSnapIndex.current = index;
        },
        [currentSnapIndex, onOpen, onClose, onChange]
      );

      const renderBackdrop = useCallback(
        (props: BottomSheetBackdropProps) => (
          <BottomSheetBackdrop
            {...props}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
            opacity={Number(backdropOpacity) > -1 ? backdropOpacity : 0.5}
          >
            <TouchableWithoutFeedback onPress={close}>
              <View style={{ flex: 1 }} />
            </TouchableWithoutFeedback>
          </BottomSheetBackdrop>
        ),
        [close, backdropOpacity]
      );

      return (
        <BottomSheetModal
          ref={ref}
          index={0}
          enableDynamicSizing={false}
          enablePanDownToClose={true}
          backdropComponent={renderBackdrop}
          onChange={onChangeSnapPoint}
          {...rest}
        ></BottomSheetModal>
      );
    }
  )
);
