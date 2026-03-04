import { lightColors } from './colors';
import { fontSize } from './fonts';

export const LightTheme = {
  dark: false,
  colors: {
    ...lightColors,

    // Required by React Navigation
    primary: lightColors.primary,
    background: lightColors.background,
    card: lightColors.card,
    text: lightColors.text,
    border: lightColors.border,
    notification: lightColors.primary,
  },
  fontSize,
};
