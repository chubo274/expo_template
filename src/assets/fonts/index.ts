// Font assets index
export const fonts = {
  SpaceMono: require('./SpaceMono-Regular.ttf'),
} as const;

// Export font names for type safety
export type FontName = keyof typeof fonts;
