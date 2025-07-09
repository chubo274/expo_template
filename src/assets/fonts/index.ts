// Font assets index
export enum FontName {
  SpaceMono = 'SpaceMono',
}

export const fonts = {
  [FontName.SpaceMono]: require('./source/SpaceMono-Regular.ttf'),
} as const;
