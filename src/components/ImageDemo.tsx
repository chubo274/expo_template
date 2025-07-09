import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ImageSource from '../assets/images';
import { AppImage } from './image';

export default function ImageDemo() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>AppImage Demo</Text>

      <Text style={styles.subtitle}>Local PNG Images:</Text>
      <View style={styles.row}>
        <AppImage
          source={ImageSource.icon}
          style={styles.image}
          contentFit='contain'
        />
        <AppImage
          source={ImageSource.favicon}
          style={styles.image}
          contentFit='contain'
        />
      </View>

      <Text style={styles.subtitle}>Local SVG Images:</Text>
      <View style={styles.row}>
        <AppImage
          source={ImageSource.star}
          style={styles.image}
          contentFit='contain'
        />
        <AppImage
          source={ImageSource.heart}
          style={styles.image}
          contentFit='contain'
        />
      </View>

      <Text style={styles.subtitle}>Remote URL Image:</Text>
      <AppImage
        source='https://picsum.photos/200/200'
        style={styles.image}
        contentFit='cover'
      />

      <Text style={styles.subtitle}>Remote SVG Image:</Text>
      <AppImage
        source='https://dev.w3.org/SVG/tools/svgweb/samples/svg-files/android.svg'
        style={styles.image}
        contentFit='contain'
      />

      <Text style={styles.subtitle}>With onPress handler:</Text>
      <AppImage
        source={ImageSource.heart}
        style={styles.image}
        contentFit='contain'
        onPress={() => console.warn('Heart clicked!')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    width: 64,
    height: 64,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
});
