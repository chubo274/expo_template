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
  icon_park_solid_check_one: require('./source/icon_park_solid_check_one.svg'),
  lets_icons_order_light: require('./source/lets_icons_order_light.svg'),
  mage_box_3d_cross_fill: require('./source/mage_box_3d_cross_fill.svg'),
  si_warning_fill: require('./source/si_warning_fill.svg'),

  // Fallback image
  fallback: require('./source/icon.png'), // using icon as fallback
} as const;

export default ImageSource;
