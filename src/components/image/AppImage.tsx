import ImageSource from 'assets/images';
import { Image, ImageContentFit, ImageProps } from 'expo-image';
import React, { memo, useCallback, useMemo, useState } from 'react';
import { ImageSourcePropType, Pressable } from 'react-native';

interface IProps extends ImageProps {
  source?: ImageSourcePropType | string;
  contentFit?: ImageContentFit;
  fallBackSource?: string;
  onPress?: () => void;
}

export const AppImage = memo((props: IProps) => {
  const {
    source,
    contentFit = 'contain',
    fallBackSource,
    onPress,
    ...rest
  } = props;
  const [isError, setIsError] = useState(false);

  const onError = useCallback(() => {
    if (!isError) setIsError(true);
  }, [isError]);

  const renderSource = useMemo(() => {
    const fallback =
      fallBackSource !== undefined ? fallBackSource : ImageSource.fallback;

    if (!source || isError) {
      return fallback;
    }
    return source;
  }, [source, isError, fallBackSource]);

  // Expo Image can handle local images, URLs, and SVGs automatically
  // No need for separate SVG handling

  return (
    <Pressable onPress={onPress} disabled={!onPress}>
      <Image
        {...rest}
        source={renderSource}
        contentFit={contentFit}
        onError={onError}
      />
    </Pressable>
  );
});
