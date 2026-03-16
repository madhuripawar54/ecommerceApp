import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useThemeStore } from '../store/theme.store';
import Icons from '../commonConfig/Icons';

type Props = {
  selected?: boolean;
  size?: number;
  onPress?: () => void;
};

const RadioButton: React.FC<Props> = ({ selected = false, size = 28, onPress }) => {
  const { theme } = useThemeStore();
  const styles = createStyles(theme.colors, size);

  return (
    <TouchableOpacity
      testID="radio-button"
      onPress={onPress}
      activeOpacity={0.8}
      style={styles.container}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
    >
      <View style={[styles.outer, selected && styles.outerActive]}>
        {selected ? (
          Icons.Tick ? (
            <Icons.Tick width={size * 0.6} height={size * 0.6} fill={'#fff'} />
          ) : (
            <View style={styles.innerDot} />
          )
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

export default RadioButton;

const createStyles = (colors: any, size: number) =>
  StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    outer: {
      width: size,
      height: size,
      borderRadius: size / 2,
      borderWidth: 1,
      borderColor: colors.border,
      justifyContent: 'center',
      alignItems: 'center',
    },
    outerActive: {
      borderColor: colors.primary,
    },
    check: {
      color: '#fff',
      fontWeight: '700',
    },
    innerDot: {
      width: size * 0.4,
      height: size * 0.4,
      borderRadius: (size * 0.4) / 2,
      backgroundColor: '#fff',
    },
  });
