import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useThemeStore} from '../store/theme.store';
import {fontFamily, fontSize} from '../theme/fonts';
import {scaleHeight, scaleWidth} from '../utils/responsive';
import Icons from '../commonConfig/Icons';
import AccountRowItem from '../components/AccountRowItem';


export default function AccountScreen() {
  const {theme} = useThemeStore();
  const styles = createStyles(theme.colors);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <View style={styles.profileContainer}>
          {/* <Image
            source={require('../../assets/images/profile.png')}
            style={styles.avatar}
          /> */}
            <Icons.ProfileImg />
          <Text style={styles.name}>Mark Adam</Text>
          <Text style={styles.email}>Sunny_Koelpin45@hotmail.com</Text>
        </View>

        {/* Options */}
        <View style={styles.listContainer}>
          <AccountRowItem title="Profile" Icon={Icons.Sprofile} />
          <AccountRowItem title="Setting" Icon={Icons.SeetingIcon} />
          <AccountRowItem title="Contact" Icon={Icons.Message} />
          <AccountRowItem title="Share App" Icon={Icons.Layer} />
          <AccountRowItem title="Help" Icon={Icons.Question} />
        </View>

        {/* Sign Out */}
        <TouchableOpacity style={styles.signOutBtn}>
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ---------- Styles ---------- */
const createStyles = (colors: any) =>
  
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },

    profileContainer: {
      alignItems: 'center',
      marginTop: scaleHeight(24),
      marginBottom: scaleHeight(32),
    },

    avatar: {
      width: scaleWidth(90),
      height: scaleWidth(90),
      borderRadius: scaleWidth(45),
      marginBottom: scaleHeight(12),
    },

    name: {
      fontSize: fontSize.lg,
      fontFamily: fontFamily.poppins.semiBold,
      color: colors.text,
    },

    email: {
      fontSize: fontSize.sm,
      fontFamily: fontFamily.poppins.regular,
      color: colors.subText,
      marginTop: 4,
    },

    listContainer: {
      paddingHorizontal: scaleWidth(16),
      gap: scaleHeight(14),
    },
    signOutBtn: {
      marginTop: scaleHeight(48),
      alignSelf: 'center',
    },

    signOutText: {
      fontSize: fontSize.md,
      fontFamily: fontFamily.poppins.semiBold,
      color: colors.danger || '#FF6A3D',
    },
  });
