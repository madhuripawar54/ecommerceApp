import { SafeAreaView } from "react-native-safe-area-context"
import { Image, StyleSheet, Text, View } from "react-native";
import ProfilePic from "./ProfilePic"
import { appImages } from "../utils/appImages";
import { useThemeStore } from "../store/theme.store";
import { useNavigation } from '@react-navigation/native';
import { scaleHeight, scaleWidth } from "../utils/responsive";
import Icons from "../commonConfig/Icons";


interface Props {
    userName: string;
  }

const Header: React.FC<Props> = ({ userName }) => {

    const { theme } = useThemeStore();
    const styles = createStyles(theme.colors);
    //const navigation = useNavigation<any>();
    // const { unreadCount } = useNotificationsStore();
  
    // const handleNotificationPress = () => {
    //   navigation.navigate('Notifications');
    // };
  
    return (
        <View style={styles.container}>
            <View style={styles.row}>
        <View style={styles.profile}>
          <Icons.ProfileImg />
        </View>

        <View>
          <Text variant="caption" style={styles.hello}>Hello!</Text>
          <Text variant="headerTitle" style={styles.name}>{userName}</Text>
        </View>
      </View>
        </View>
    )
}


const createStyles = (colors: any) =>
    StyleSheet.create({
      container: {
        marginHorizontal: scaleWidth(16),
        marginTop: scaleHeight(20),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
  
      row: {
        flexDirection: 'row',
        alignItems: 'center',
      },
  
      profile: {
        width: scaleWidth(48),
        height: scaleHeight(48),
        borderRadius: scaleWidth(24),
        marginRight: scaleWidth(12),
        backgroundColor: colors.card,
        justifyContent: 'center',
        alignItems: 'center',
      },
  
      hello: {
        fontSize: 14,
        color: colors.textSecondary,
      },
  
      name: {
        fontSize: 18,
        fontWeight: '600',
        color: colors.text,
      },
  
      moreNotify: {
        width: scaleWidth(48),
        height: scaleHeight(48),
        backgroundColor: colors.bgSearch,
        borderRadius: scaleWidth(40),
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      },
      badge: {
        position: 'absolute',
        top: scaleHeight(8),
        right: scaleWidth(8),
        backgroundColor: colors.primary,
        borderRadius: scaleWidth(10),
        minWidth: scaleWidth(20),
        height: scaleHeight(20),
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: scaleWidth(4),
      },
      badgeText: {
        color: '#FFFFFF',
        fontSize: 10,
        fontWeight: 'bold',
      },
    });
export default Header;  