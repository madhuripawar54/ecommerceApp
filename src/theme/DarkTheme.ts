import { darkColors } from './colors'; 
import { fontSize } from './fonts';

export const DarkTheme = {
  dark: true,
  colors: {
    ...darkColors,

    // Required by React Navigation
    primary: darkColors.primary,
    background: darkColors.background,
    card: darkColors.card,
    text: darkColors.text,
    border: darkColors.border,
    notification: darkColors.primary,
  },
  fontSize,
};
