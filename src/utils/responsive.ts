import { Dimensions, PixelRatio } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Base guideline sizes (based on your design)
const guidelineBaseWidth = 375;  // iPhone 11 width
const guidelineBaseHeight = 812; // iPhone 11 height

// Scale horizontally
export const scaleWidth = (size: number) => (SCREEN_WIDTH / guidelineBaseWidth) * size;

// Scale vertically
export const scaleHeight = (size: number) => (SCREEN_HEIGHT / guidelineBaseHeight) * size;

// Moderate scale: slightly scale with factor (default 0.5)
export const moderateScaleSize = (size: number, factor: number = 0.5) =>
  size + (scaleWidth(size) - size) * factor;

// Font scaling
export const scaleFont = (size: number) => {
  const newSize = moderateScaleSize(size);
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

// Export react-native-size-matters functions too (optional)
export { scale, verticalScale, moderateScale };
