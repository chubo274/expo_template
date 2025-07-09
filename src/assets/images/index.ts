// Images exports
const ImageSource = {
  // App icons (PNG)
  icon: require('./source/icon.png'),
  adaptiveIcon: require('./source/adaptive-icon.png'),
  favicon: require('./source/favicon.png'),
  splashIcon: require('./source/splash-icon.png'),

  // SVG icons
  star: require('./source/star.svg'),
  heart: require('./source/heart.svg'),

  // Fallback image
  fallback: require('./source/icon.png'), // using icon as fallback
} as const;

export default ImageSource;
