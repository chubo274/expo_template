import ImageSource from 'assets/images';
import { AppImage } from 'components/image';
import { AppText } from 'components/text/AppText';
import { useGetVideoList } from 'data/hookApis/example';
import {
  ActivityIndicator,
  Button,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import ZustandPersist from 'store/persist';

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
        <AppText style={styles.title}>Tab One</AppText>
        <AppImage
          source={ImageSource.icon}
          style={styles.image}
          contentFit='contain'
        />

        {/* API Test Section */}
        <View style={styles.apiTestSection}>
          <AppText style={styles.sectionTitle}>API Test - Video List</AppText>
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size='large' color='#0000ff' />
              <AppText>Loading videos...</AppText>
            </View>
          ) : error ? (
            <View style={styles.errorContainer}>
              <AppText style={styles.errorAppText}>
                Error: {error.message}
              </AppText>
            </View>
          ) : videoData ? (
            <View style={styles.successContainer}>
              <AppText style={styles.successAppText}>
                ✅ API Call Success!
              </AppText>
              <AppText>
                Data loaded: {JSON.stringify(videoData, null, 2)}
              </AppText>
            </View>
          ) : (
            <AppText>No data</AppText>
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
        <View style={styles.separator} />
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
  errorAppText: {
    color: '#d32f2f',
    fontWeight: 'bold',
  },
  successContainer: {
    padding: 15,
    backgroundColor: '#e8f5e8',
    borderRadius: 5,
  },
  successAppText: {
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
  image: {
    width: 64,
    height: 64,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
});
