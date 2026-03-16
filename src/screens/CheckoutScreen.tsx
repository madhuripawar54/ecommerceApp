import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CommonHeader from '../components/CommonHeader';
import { useThemeStore } from '../store/theme.store';
import { scaleHeight, scaleWidth } from '../utils/responsive';
import { fontFamily, fontSize } from '../theme/fonts';
import useCartStore from '../store/cart.store';
import CommonButton from '../components/CommonButton';
import OrderSummary from '../components/OrderSummary';
import { useNavigation } from '@react-navigation/native';
import Icons from '../commonConfig/Icons';
import PaymentOption from '../components/PaymentOption';

export default function CheckoutScreen() {
  const { theme } = useThemeStore();
  const styles = createStyles(theme.colors);

  const items = useCartStore(state => state.items);
  const subtotal = useCartStore(state => state.subtotal);
  const totalItems = useCartStore(state => state.totalItems);

  const [method, setMethod] = useState<'paypal' | 'card' | 'cash' | 'new' | undefined>(undefined);

  // disable checkout when there are no items or no payment method selected
  const disabled = items.length === 0 || !method;
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.container}>
      <CommonHeader title="Check Out" showBack onBack={() => navigation.goBack()} onMenu={() => { }} style={styles.header} />

      <View style={{ paddingHorizontal: scaleWidth(0), paddingTop: scaleHeight(12) }}>
        <View style={styles.rowItem}>
          <View style={styles.iconCircle}>
            <Icons.locationIcon width={scaleWidth(24)} height={scaleHeight(24)} />
          </View>
          <View style={{ marginLeft: 12 }}>
            <Text style={styles.itemTitle}>325 15th Eighth Avenue, NewYork</Text>
            <Text style={styles.itemSub}>Saepe eaque fugiat ea voluptatum veniam.</Text>
          </View>
        </View>

        <View style={[styles.rowItem, { marginTop: 12 }]}>
          <View style={styles.iconCircle}>
            <Icons.TimerIcon width={scaleWidth(24)} height={scaleHeight(24)} />
          </View>
          <View style={{ marginLeft: 12 }}>
            <Text style={styles.itemTitle}>6:00 pm, Wednesday 20</Text>
          </View>
        </View>

        <OrderSummary itemsCount={totalItems()} subtotal={subtotal()} discount={4} delivery={2} />

        <Text style={[styles.sectionHeading, { marginTop: 12 }]}>Choose payment method</Text>

        <PaymentOption
          icon={<Icons.PayPal width={scaleWidth(20)} height={scaleHeight(20)} />}
          label="Paypal"
          selected={method === 'paypal'}
          onPress={() => setMethod('paypal')}
        />

        <PaymentOption
          icon={<Icons.card width={scaleWidth(20)} height={scaleHeight(20)} />}
          label="Credit Card"
          selected={method === 'card'}
          onPress={() => setMethod('card')}
        />

        <PaymentOption
          icon={<Icons.GoldIcon width={scaleWidth(20)} height={scaleHeight(20)} />}
          label="Cash"
          selected={method === 'cash'}
          onPress={() => setMethod('cash')}
        />

        <TouchableOpacity style={[styles.addMethodRow]} onPress={() => setMethod('new')}>
          <Text style={styles.addMethod}>Add new payment method</Text>
          <View style={styles.plusCircle}>
            <Icons.BluePlus width={scaleWidth(12)} height={scaleHeight(12)} />
          </View>
        </TouchableOpacity>

      </View>
     <CommonButton
       title="Check Out"
       width={"100%"}
       disabled={disabled}
       onPress={() => {
         useCartStore.getState().clearCart();
         navigation.navigate('Orders');
       }}
     />
    </SafeAreaView>
  );
}

const Row = ({ label, value, bold = false }: any) => {
  const { theme } = useThemeStore();

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
      <Text
        style={{
          color: theme.colors.textSecondary,
          fontFamily: bold ? fontFamily.poppins.semiBold : fontFamily.poppins.regular,
        }}>
        {label}
      </Text>
      <Text
        style={{
          color: theme.colors.text,
          fontFamily: bold ? fontFamily.poppins.semiBold : fontFamily.poppins.regular,
        }}>
        {value}
      </Text>
    </View>
  );
};

const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      padding: scaleWidth(16),

    },
    header: {
      marginLeft: scaleHeight(10)
    },
    rowItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: scaleHeight(8)
    },
    iconCircle: {
      width: scaleWidth(44),
      height: scaleHeight(44),
      borderRadius: scaleWidth(22),
      backgroundColor: colors.bgSearch, justifyContent: 'center', alignItems: 'center'
    },
    itemTitle: { fontFamily: fontFamily.poppins.semiBold, color: colors.text, fontSize: fontSize.sm, fontWeight: '600' },
    itemSub: {
      color: colors.placeText,
      fontFamily: fontFamily.poppins.regular,
      fontSize: fontSize.xs,
      fontWeight: '400'
    },
    summary: { backgroundColor: colors.card, borderRadius: scaleWidth(12), padding: scaleWidth(16), marginTop: scaleHeight(16) },
    summaryTitle: { fontFamily: fontFamily.poppins.semiBold, fontSize: fontSize.lg, color: colors.text, marginBottom: scaleHeight(8) },
    divider: { height: 1, backgroundColor: colors.border, marginVertical: scaleHeight(8) },
    sectionHeading: { fontFamily: fontFamily.poppins.semiBold, fontSize: fontSize.md, color: colors.text },
    methodRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: scaleHeight(12) },
  methodLeft: { flexDirection: 'row', alignItems: 'center' },
  cashIcon: { width: scaleWidth(32), height: scaleHeight(32), borderRadius: scaleWidth(16), backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center' },
    methodLabel: { color: colors.text, fontFamily: fontFamily.poppins.regular },
    radio: { width: scaleWidth(28), height: scaleHeight(28), borderRadius: scaleWidth(14), borderWidth: 1, borderColor: colors.border, justifyContent: 'center', alignItems: 'center' },
    radioActive: { backgroundColor: colors.primary, borderColor: colors.primary },
    check: { color: '#fff', fontWeight: '700' },
    addMethodRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: scaleHeight(12) },
    addMethod: { color: colors.text, fontFamily: fontFamily.poppins.regular },
    plusCircle: {
      width: scaleWidth(28),
      height: scaleHeight(28),
      borderRadius: scaleWidth(16),
      backgroundColor: colors.bgSearch,
      justifyContent: 'center',
      alignItems: 'center'
    },
  });
