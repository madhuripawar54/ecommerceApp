import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import CommonHeader from '../components/CommonHeader';
import { useThemeStore } from '../store/theme.store';
import CartItem from '../components/CartItem';
import CommonButton from '../components/CommonButton';
import OrderSummary from '../components/OrderSummary';
import { scaleHeight } from '../utils/responsive';
import { fontFamily, fontSize } from '../theme/fonts';
import useCartStore from '../store/cart.store';
import { useRoute } from '@react-navigation/native';

export default function CartScreen() {
  const { theme } = useThemeStore();
  const styles = createStyles(theme.colors);
  const navigation = useNavigation<any>();

  const items = useCartStore(state => state.items);
  const subtotal = useCartStore(state => state.subtotal);
  const totalItems = useCartStore(state => state.totalItems);
  const addToCart = useCartStore(state => state.addToCart);

  const route = useRoute();

  useEffect(() => {
    // If navigated here with a product param, auto-add it to cart
    // route.params may be undefined; guard accordingly
    const params: any = (route as any).params;
    if (params && params.product) {
      addToCart(params.product, 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <CommonHeader title="Cart" showBack onBack={() => navigation.goBack()} showMenu onMenu={() => {}} />

      <FlatList
        data={items}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <CartItem item={item} />}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View style={{ padding: 16 }}>
            <Text style={{ color: theme.colors.textSecondary }}>Your cart is empty</Text>
          </View>
        )}
      />

      {items.length > 0 && (
          <>
            <OrderSummary itemsCount={totalItems()} subtotal={subtotal()} discount={0} delivery={0} />
            <CommonButton title="Check Out" width={"100%"} disabled={items.length === 0} onPress={() => (navigation as any).navigate('Checkout')} />
          </>
      )}
    </SafeAreaView>
  );
}


const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      padding: 16,
    },
    summary: {
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: 16,
      marginBottom: scaleHeight(16),
    },
    summaryTitle: {
      fontFamily: fontFamily.poppins.semiBold,
      fontSize: fontSize.lg,
      color: colors.text,
      marginBottom: 12,
    },
    divider: {
      height: 1,
      backgroundColor: colors.border,
      marginVertical: 8,
    },
  });
