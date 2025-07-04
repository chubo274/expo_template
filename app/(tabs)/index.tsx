import EditScreenInfo from '@/src/components/EditScreenInfo';
import { Text, View } from '@/src/components/Themed';
import { useGetVideoList } from '@/src/data/hookApis/example';
import ZustandPersist from '@/src/store/persist';
import {
  ActivityIndicator,
  Button,
  ScrollView,
  StyleSheet,
} from 'react-native';

export default function TabOneScreen() {
  // Test API call
  const {
    data: videoData,
    isLoading,
    error,
  } = useGetVideoList({ page: 1, limit: 10 });

  // useEffect(() => {
  //   console.log('data', ZustandPersist.getState()?.Token);
  // }, []);

  // useEffect(() => {
  //   if (videoData) {
  //     console.log('Video data loaded:', videoData);
  //   }
  //   if (error) {
  //     console.error('Video data error:', error);
  //   }
  // }, [videoData, error]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Tab One</Text>

        {/* API Test Section */}
        <View style={styles.apiTestSection}>
          <Text style={styles.sectionTitle}>API Test - Video List</Text>
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size='large' color='#0000ff' />
              <Text>Loading videos...</Text>
            </View>
          ) : error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>Error: {error.message}</Text>
            </View>
          ) : videoData ? (
            <View style={styles.successContainer}>
              <Text style={styles.successText}>✅ API Call Success!</Text>
              <Text>Data loaded: {JSON.stringify(videoData, null, 2)}</Text>
            </View>
          ) : (
            <Text>No data</Text>
          )}
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title='Save Token'
            onPress={() => {
              ZustandPersist.getState().save('Token', {
                token: '1234567890abcdef',
              });
            }}
          />
        </View>
        <View
          style={styles.separator}
          lightColor='#eee'
          darkColor='rgba(255,255,255,0.1)'
        />
        <EditScreenInfo path='app/(tabs)/index.tsx' />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  apiTestSection: {
    width: '100%',
    marginVertical: 20,
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  loadingContainer: {
    alignItems: 'center',
    padding: 20,
  },
  errorContainer: {
    padding: 15,
    backgroundColor: '#ffebee',
    borderRadius: 5,
  },
  errorText: {
    color: '#d32f2f',
    fontWeight: 'bold',
  },
  successContainer: {
    padding: 15,
    backgroundColor: '#e8f5e8',
    borderRadius: 5,
  },
  successText: {
    color: '#2e7d32',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
