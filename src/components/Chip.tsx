import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { scaleWidth, scaleHeight, scale } from '../utils/responsive';
import { useThemeStore } from '../store/theme.store';
import { fontFamily } from '../theme/fonts';
import Text from './Text';

type Props = {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
};

const Chip: React.FC<Props> = ({ label, selected = false, onPress, style, textStyle }) => {
  const { theme } = useThemeStore();
  const colors = theme.colors;
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPress}
            style={[styles.chip, { backgroundColor: selected ? colors.primary : colors.card }, style]}
        >
        <Text variant="body" style={[styles.label, { color: selected ? colors.background : colors.text }, textStyle]}>{label}</Text>
        </TouchableOpacity>
    );
};

export default Chip;

const styles = StyleSheet.create({
  chip: {
    paddingVertical: scaleHeight(10),
    paddingHorizontal: scaleWidth(14),
    borderRadius: scaleHeight(12),
    marginRight: scaleWidth(12),
    marginBottom: scaleHeight(12),
  },
  label: {
    fontFamily: fontFamily.poppins.regular,
    fontSize: scale(14),
    color: 'rgba(0, 0, 0, 0.5)',
  },
});
