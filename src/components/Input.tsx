import React from 'react';
import { View, TextInput, StyleSheet, TextInputProps, ViewStyle, StyleProp } from 'react-native';
import { useThemeStore } from '../store/theme.store';
import { scaleHeight, scaleWidth } from '../utils/responsive';

type Props = TextInputProps & {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
};

const Input: React.FC<Props> = ({ leftIcon, rightIcon, containerStyle, style, ...rest }) => {
  const { theme } = useThemeStore();
  const styles = createStyles(theme.colors);

  return (
    <View style={[styles.container, containerStyle, { backgroundColor: theme.colors.bgSearch }]}>
      {leftIcon ? <View style={styles.left}>{leftIcon}</View> : null}
      <TextInput
        {...rest}
        placeholderTextColor={rest.placeholderTextColor || theme.colors.placeText}
        style={[styles.input, style]}
      />
      {rightIcon ? <View style={styles.right}>{rightIcon}</View> : null}
    </View>
  );
};

export default Input;

const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      marginHorizontal: scaleWidth(16),
      marginTop: scaleHeight(20),
      paddingHorizontal: scaleWidth(12),
      height: scaleHeight(48),
      borderRadius: 30,
      flexDirection: 'row',
      alignItems: 'center',
    },
    left: { width: scaleWidth(22), height: scaleHeight(22), marginRight: scaleWidth(10), justifyContent: 'center', alignItems: 'center' },
    right: { marginLeft: scaleWidth(10), justifyContent: 'center', alignItems: 'center' },
    input: { flex: 1, fontSize: 16, color: colors.text },
  });


   () => {

   }

