import React, { useState, useMemo } from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Text from '../components/Text';
import OrderCard from '../components/OrderCard';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { scaleWidth, scaleHeight } from '../utils/responsive';
import { useThemeStore } from '../store/theme.store';
import CommonHeader from '../components/CommonHeader';
import { useOrdersStore } from '../store/orders.store';

// Orders now come from the orders store (useOrdersStore)

const TABS = [
    { key: 'active', label: 'Active' },
    { key: 'completed', label: 'Completed' },
    { key: 'cancelled', label: 'Cancel' },
];

export default function OrdersScreen() {
    const { theme } = useThemeStore();
    const colors = theme.colors;
    const styles = createStyles(colors);

    const [activeTab, setActiveTab] = useState<'active' | 'completed' | 'cancelled'>('active');
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Orders'>>();

    const orders = useOrdersStore(state => state.orders);
    const filtered = useMemo(() => orders.filter(o => o.status === activeTab), [orders, activeTab]);

    const handlePress = (id: number) => {
        navigation.navigate('OrderDetails', { orderId: id });
    };

    return (
        <View style={styles.container}>
            <CommonHeader title="Orders" showBack onBack={() => navigation.goBack()} />
            <View style={styles.tabs}>
                {TABS.map(tab => (
                    <TouchableOpacity
                        key={tab.key}
                        onPress={() => setActiveTab(tab.key as any)}
                        style={activeTab === tab.key ? [styles.tab, styles.tabActive] : styles.tab}
                        activeOpacity={0.8}
                    >
                        <Text variant="body" style={activeTab === tab.key ? styles.tabTextActive : styles.tabText}>{tab.label}</Text>
                        {activeTab === tab.key ? <View style={styles.tabUnderline} /> : null}
                    </TouchableOpacity>
                ))}
            </View>

            <FlatList
                data={filtered}
                keyExtractor={item => String(item.id)}
                renderItem={({ item }) => {
                    const first = item.items && item.items.length ? item.items[0] : undefined;
                    return (
                        <OrderCard
                            id={item.id}
                            name={item.title || first?.name || 'Order'}
                            brand={first?.brand}
                            price={item.total}
                            image={item.image || first?.image}
                            onPress={() => handlePress(item.id)}
                            onTrack={() => handlePress(item.id)}
                        />
                    );
                }}
                contentContainerStyle={{ paddingBottom: scaleHeight(40) }}
                ListEmptyComponent={<View style={styles.empty}><Text variant="body">No orders</Text></View>}
            />
        </View>
    );
}

const createStyles = (colors: any) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background,
            paddingTop: scaleWidth(46),
            paddingLeft: scaleWidth(16),
            paddingRight: scaleWidth(16),
        },
        tabs: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginLeft: scaleWidth(4),
            marginTop: scaleHeight(16),

        },
        tab: {
            paddingVertical: scaleHeight(6),
            paddingHorizontal: scaleWidth(6),
            alignItems: 'center',
        },
        tabActive: {},
        tabUnderline: {
            height: scaleHeight(3),
            width: '100%',
            borderRadius: scaleHeight(4),
            marginTop: scaleHeight(8),
            backgroundColor: colors.primary,
        },
        tabText: { color: colors.textSecondary, fontWeight: '600' },
        tabTextActive: { color: colors.text, fontWeight: '700' },
        empty: { padding: scaleWidth(16) },
    });
