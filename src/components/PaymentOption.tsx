import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { scaleWidth, scaleHeight } from '../utils/responsive';
import RadioButton from './RadioButton';
import { useThemeStore } from '../store/theme.store';
import { fontFamily } from '../theme/fonts';

type Props = {
  icon?: React.ReactNode;
  label: string;
  selected?: boolean;
  onPress?: () => void;
};

const PaymentOption: React.FC<Props> = ({ icon, label, selected = false, onPress }) => {
  const { theme } = useThemeStore();
  const styles = createStyles(theme.colors);

  return (
    <TouchableOpacity style={styles.row} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.left}>
        {icon}
        <Text style={styles.label}>{label}</Text>
      </View>
    <RadioButton selected={selected} onPress={onPress} />
    </TouchableOpacity>
  );
};

export default PaymentOption;

const createStyles = (colors: any) =>
  StyleSheet.create({
    row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: scaleHeight(12) },
    left: { flexDirection: 'row', alignItems: 'center' },
    label: { marginLeft: scaleWidth(12), color: colors.text, fontFamily: fontFamily.poppins.regular },
  });
