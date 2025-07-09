import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { AppButton } from 'components/button/AppButton';
import { AppModal } from 'components/modal/AppModal';
import { AppText } from 'components/text/AppText';
import { useRef } from 'react';
import { StyleSheet, View } from 'react-native';

export default function TabTwoScreen() {
  const refModal = useRef<BottomSheetModal>(null);
  return (
    <View style={styles.container}>
      <AppText style={styles.title}>Tab Two</AppText>
      <View style={{ flexDirection: 'row', gap: 8, marginTop: 16 }}>
        <AppButton
          title={'Open Modal'}
          leftIcon={<AppText>🔼</AppText>}
          onPress={() => refModal.current?.present()}
        />
      </View>
      <AppModal ref={refModal} snapPoints={['50%']}>
        <View style={styles.container}>
          <AppText style={styles.title}>Modal Content</AppText>
          <AppButton
            title={'Close Modal'}
            leftIcon={<AppText>🔽</AppText>}
            onPress={() => refModal.current?.dismiss()}
          />
        </View>
      </AppModal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
  },
});
