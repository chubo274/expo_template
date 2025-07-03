import { Button, StyleSheet } from 'react-native';
import EditScreenInfo from '@/src/components/EditScreenInfo';
import { Text, View } from '@/src/components/Themed';
import ZustandPersist from '@/src/store/persist';
import { useEffect } from 'react';

export default function TabOneScreen() {
  useEffect(() => {
    console.log('data', ZustandPersist.getState()?.Token);
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
        <Button
          title='Click Me'
          onPress={() => {
            ZustandPersist.getState().save('Token', { token: '1234567890abcdef' });
          }}
        />
      </View>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
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
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
