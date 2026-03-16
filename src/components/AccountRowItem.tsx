import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useThemeStore } from '../store/theme.store';
import { fontFamily, fontSize } from '../theme/fonts';
import { scaleHeight, scaleWidth } from '../utils/responsive';
import Icons from '../commonConfig/Icons';

type AccountRowItemProps = {
  title: string;
  Icon: React.FC<any>;
  onPress?: () => void;
};

const AccountRowItem: React.FC<AccountRowItemProps> = ({
  title,
  Icon,
  onPress,
}) => {
  const { theme } = useThemeStore();
  const styles = createStyles(theme.colors);

  return (
    <TouchableOpacity style={styles.rowContainer} onPress={onPress}>
      <View style={styles.rowLeft}>
        <Icon width={20} height={20} />
        <Text style={styles.rowText}>{title}</Text>
      </View>
      <Icons.ArrowLeft width={16} height={16} />
    </TouchableOpacity>
  );
};

export default AccountRowItem;

const createStyles = (colors: any) =>
  StyleSheet.create({
    rowContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.card,
      paddingVertical: scaleHeight(16),
      paddingHorizontal: scaleWidth(16),
      borderRadius: 14,
    },
    rowLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    rowText: {
      fontSize: fontSize.md,
      fontFamily: fontFamily.poppins.medium,
      color: colors.text,
    },
  });
