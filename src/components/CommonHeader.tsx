import React from 'react';
import { View, TouchableOpacity, StyleSheet,ViewStyle, TextStyle } from 'react-native';
import { scaleWidth, scaleHeight } from '../utils/responsive';
import { useThemeStore } from '../store/theme.store';
import Icons from '../commonConfig/Icons';
import Text from './Text';

interface Props {
  title?: string;
  showBack?: boolean;
  showMenu?: boolean;
  onBack?: () => void;
  onMenu?: () => void;
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle | TextStyle[];
  rightComponent?: React.ReactNode;
}

const CommonHeader: React.FC<Props> = ({ title, showBack = true, showMenu = false, onBack, onMenu, rightComponent }) => {
  const { theme } = useThemeStore();
  const styles = createStyles(theme.colors);

  return (
    <View style={styles.container}>
      <View style={styles.side}>
        {showBack ? (
          <TouchableOpacity style={[styles.iconWrap]} onPress={onBack}>
            <Icons.BackIcon width={20} height={20} />
          </TouchableOpacity>
        ) : <View style={styles.iconPlaceholder} />}
      </View>

      <View style={styles.titleWrap} pointerEvents="none">
        {/* <Text style={styles.title}>{title}</Text> */}

      <Text variant="title" style={styles.title}>{title}</Text>
      </View>

      <View style={styles.side}>
        {rightComponent ? (
          rightComponent
        ) : showMenu ? (
          <TouchableOpacity style={[styles.iconWrap, { marginLeft: scaleWidth(10) }]} onPress={onMenu}>
            <Icons.ThreeDots  width={scaleWidth(24)} height={scaleHeight(24)} />
          </TouchableOpacity>
        ) : <View style={styles.iconPlaceholder} />}
      </View>
    </View>
  );
};

export default CommonHeader;

const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      //marginBottom: scaleHeight(16),

    },
    side: {
      width: scaleWidth(56),
      alignItems: 'flex-start',
    },
    iconWrap: {
      width: scaleWidth(44),
      height: scaleHeight(44),
      borderRadius: scaleWidth(22),
      backgroundColor: colors.bgSearch,
      justifyContent: 'center',
      alignItems: 'center',
    },
    iconPlaceholder: {
      width: scaleWidth(44),
      height: scaleHeight(44),
    },
    titleWrap: {
      flex: 1,
      alignItems: 'center',
    },
    title: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text,
    },
    menuDots: {
      color: colors.text,
      fontSize: 20,
      lineHeight: 20,
    },
  });
