import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useThemeStore } from '../store/theme.store';
import { useNotificationsStore } from '../store/notifications.store';
import { scaleHeight, scaleWidth } from '../utils/responsive';
import CommonHeader from '../components/CommonHeader';
import Text from '../components/Text';
import { useNavigation } from '@react-navigation/native';
import { fontFamily, fontSize } from '../theme/fonts';
// import { getFcmToken } from '../notifications/pushNotificationService';
import { ScrollView } from 'react-native';

export default function NotificationScreen() {
  const { theme } = useThemeStore();
  const styles = createStyles(theme.colors);
  const navigation = useNavigation<any>();
  const { notifications, unreadCount, markAsRead, markAllAsRead, removeNotification } = useNotificationsStore();
  const [refreshing, setRefreshing] = React.useState(false);
  const [fcmToken] = React.useState<string | null>(null);
  const [showToken, setShowToken] = React.useState(false);

  // React.useEffect(() => {
  //   // Get FCM token for testing
  //   getFcmToken().then(setFcmToken);
  // }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Refresh FCM token
    //getFcmToken().then(setFcmToken);
    // Simulate refresh - in real app, you might fetch from server
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const handleNotificationPress = (notification: any) => {
    markAsRead(notification.id);
    
    // Navigate based on notification type
    if (notification.type === 'order' && notification.data?.orderId) {
      navigation.navigate('OrderDetails', { orderId: notification.data.orderId });
    } else if (notification.data?.productId) {
      // Navigate to product if applicable
      // navigation.navigate('ProductDetails', { productId: notification.data.productId });
    }
  };

  const formatTime = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    
    return new Date(timestamp).toLocaleDateString();
  };

  const renderNotification = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[
        styles.notificationItem,
        !item.read && styles.unreadNotification,
      ]}
      onPress={() => handleNotificationPress(item)}
      activeOpacity={0.7}
    >
      <View style={styles.notificationContent}>
        <View style={styles.notificationHeader}>
          <Text variant="title" style={styles.notificationTitle}>
            {item.title}
          </Text>
          {!item.read && <View style={styles.unreadDot} />}
        </View>
        <Text variant="body" style={styles.notificationBody}>
          {item.body}
        </Text>
        <Text variant="caption" style={styles.notificationTime}>
          {formatTime(item.timestamp)}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => removeNotification(item.id)}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Text style={styles.deleteText}>×</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text variant="body" style={styles.emptyText}>
        No notifications yet
      </Text>
      <Text variant="caption" style={styles.emptySubtext}>
        You'll see notifications here when you receive them
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <CommonHeader
        title="Notifications"
        showBack
        onBack={() => navigation.goBack()}
        rightComponent={
          <View style={styles.headerActions}>
            {notifications.length > 0 && unreadCount() > 0 && (
              <TouchableOpacity onPress={markAllAsRead} style={styles.markAllButton}>
                <Text variant="caption" style={styles.markAllRead}>
                  Mark all read
                </Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={() => setShowToken(!showToken)} style={styles.tokenButton}>
              <Text variant="caption" style={styles.tokenButtonText}>
                {showToken ? 'Hide' : 'Token'}
              </Text>
            </TouchableOpacity>
          </View>
        }
      />
      
      {showToken && fcmToken && (
        <View style={styles.tokenContainer}>
          <Text variant="caption" style={styles.tokenLabel}>FCM Token (for testing):</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Text variant="caption" style={styles.tokenText} selectable>
              {fcmToken}
            </Text>
          </ScrollView>
        </View>
      )}
      
      {notifications.length > 0 && (
        <View style={styles.headerInfo}>
          <Text variant="caption" style={styles.headerText}>
            {unreadCount()} unread
          </Text>
        </View>
      )}

      <FlatList
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={item => item.id}
        contentContainerStyle={
          notifications.length === 0 ? styles.emptyList : styles.list
        }
        ListEmptyComponent={renderEmpty}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.colors.primary}
          />
        }
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    list: {
      paddingHorizontal: scaleWidth(16),
      paddingTop: scaleHeight(8),
      paddingBottom: scaleHeight(20),
    },
    emptyList: {
      flex: 1,
    },
    headerInfo: {
      paddingHorizontal: scaleWidth(16),
      paddingVertical: scaleHeight(8),
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    headerText: {
      color: colors.textSecondary,
      fontSize: fontSize.xs,
    },
    notificationItem: {
      flexDirection: 'row',
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: scaleWidth(16),
      marginBottom: scaleHeight(12),
      borderLeftWidth: 4,
      borderLeftColor: 'transparent',
    },
    unreadNotification: {
      borderLeftColor: colors.primary,
      backgroundColor: colors.bgSearch,
    },
    notificationContent: {
      flex: 1,
    },
    notificationHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: scaleHeight(4),
    },
    notificationTitle: {
      fontSize: fontSize.md,
      fontFamily: fontFamily.poppins.semiBold,
      color: colors.text,
      flex: 1,
    },
    unreadDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: colors.primary,
      marginLeft: scaleWidth(8),
    },
    notificationBody: {
      fontSize: fontSize.sm,
      color: colors.textSecondary,
      marginBottom: scaleHeight(4),
      lineHeight: 20,
    },
    notificationTime: {
      fontSize: fontSize.xs,
      color: colors.textSecondary,
      marginTop: scaleHeight(4),
    },
    deleteButton: {
      width: scaleWidth(32),
      height: scaleHeight(32),
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: scaleWidth(8),
    },
    deleteText: {
      fontSize: 24,
      color: colors.textSecondary,
      lineHeight: 24,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: scaleWidth(32),
    },
    emptyText: {
      fontSize: fontSize.lg,
      fontFamily: fontFamily.poppins.semiBold,
      color: colors.text,
      marginBottom: scaleHeight(8),
      textAlign: 'center',
    },
    emptySubtext: {
      color: colors.textSecondary,
      textAlign: 'center',
    },
    markAllRead: {
      color: colors.primary,
      fontSize: fontSize.sm,
    },
    headerActions: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: scaleWidth(8),
    },
    markAllButton: {
      paddingHorizontal: scaleWidth(8),
    },
    tokenButton: {
      paddingHorizontal: scaleWidth(8),
      paddingVertical: scaleHeight(4),
    },
    tokenButtonText: {
      color: colors.primary,
      fontSize: fontSize.xs,
    },
    tokenContainer: {
      backgroundColor: colors.bgSearch,
      padding: scaleWidth(12),
      marginHorizontal: scaleWidth(16),
      marginTop: scaleHeight(8),
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.border,
    },
    tokenLabel: {
      color: colors.textSecondary,
      fontSize: fontSize.xs,
      marginBottom: scaleHeight(4),
    },
    tokenText: {
      color: colors.text,
      fontSize: fontSize.xs,
      fontFamily: 'monospace',
    },
  });

