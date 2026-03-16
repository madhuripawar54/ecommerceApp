import { create } from 'zustand';
import { Appearance } from 'react-native';
import { LightTheme } from '../theme/LightTheme';
import { DarkTheme } from '../theme/DarkTheme';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeState {
  mode: ThemeMode;
  theme: typeof LightTheme;
  setMode: (mode: ThemeMode) => void;
  syncWithSystem: () => void;
}

const getSystemTheme = () => {
  const scheme = Appearance.getColorScheme();
  return scheme === 'dark' ? DarkTheme : LightTheme;
};

export const useThemeStore = create<ThemeState>((set) => ({
  mode: 'system',
  theme: getSystemTheme(),

  setMode: (mode) =>
    set(() => ({
      mode,
      theme:
        mode === 'dark'
          ? DarkTheme
          : mode === 'light'
          ? LightTheme
          : getSystemTheme(),
    })),

  syncWithSystem: () =>
    set(() => ({
      theme: getSystemTheme(),
    })),
}));
