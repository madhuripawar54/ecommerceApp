import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { scaleHeight, scaleWidth } from '../utils/responsive'
import { useThemeStore } from '../store/theme.store';
import { fontFamily, fontSize } from '../theme/fonts';

interface Props {
  title: string;
  onPress: () => void;
  width?: number | string;
  height?: number;
  bgColor?: string;
  textColor?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle | TextStyle[];
}

const CommonButton: React.FC<Props> = ({
  title,
  onPress,
  width,
  height,
  bgColor,
  textColor,
  disabled = false,
  fullWidth = false,
  style,
  textStyle,
}) => {
  const { theme } = useThemeStore();
  const styles = createStyles(theme.colors);

  const buttonBackground = bgColor || theme.colors.primary;
  const labelColor = textColor || theme.colors.background;

  return (
    <TouchableOpacity
      testID='common-button'
      activeOpacity={0.85}
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.button,
        fullWidth && { flex: 1 },
        width && !fullWidth ? { width: (width as any) } : {},
        height ? { height } : {},
        { backgroundColor: disabled ? theme.colors.border : buttonBackground },
        style,
      ]}
    >
      <Text style={[styles.text, { color: labelColor }, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CommonButton;

const createStyles = (colors: any) =>
  StyleSheet.create({
    button: {
      width: scaleWidth(245),
      height: scaleHeight(48),
      backgroundColor: colors.primary,
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      color: colors.background,
      fontFamily: fontFamily.poppins.semiBold,
      fontSize: fontSize.md,
    },
  });
