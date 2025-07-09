import { useFonts as useExpoFonts } from 'expo-font';
import { fonts, FontName } from '.';

export const useFonts = () => {
  const fontMap: Record<FontName, any> = {
    [FontName.SpaceMono]: fonts[FontName.SpaceMono],
  };

  const [fontsLoaded] = useExpoFonts(fontMap);

  return fontsLoaded;
};
