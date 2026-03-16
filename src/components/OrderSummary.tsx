import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useThemeStore } from '../store/theme.store';
import { fontFamily, fontSize } from '../theme/fonts';
import { scaleHeight, scaleWidth } from '../utils/responsive';

type Props = {
  itemsCount: number;
  subtotal: number;
  discount?: number | string;
  delivery?: number | string;
  title?: string;
};

const OrderSummary: React.FC<Props> = ({ itemsCount, subtotal, discount = 0, delivery = 0, title = 'Order Summary' }) => {
  const { theme } = useThemeStore();
  const styles = createStyles(theme.colors);

  const Row = ({ label, value, bold = false }: any) => (
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

  return (
    <View style={styles.summary}>
      <Text style={styles.summaryTitle}>{title}</Text>
      <View style={{ marginBottom: 8 }} />
      <Row label="Items" value={String(itemsCount)} />
      <Row label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
      <Row label="Discount" value={typeof discount === 'number' ? `$${Number(discount).toFixed(2)}` : String(discount)} />
      <Row label="Delivery Charges" value={typeof delivery === 'number' ? `$${Number(delivery).toFixed(2)}` : String(delivery)} />

      <View style={styles.divider} />
      <Row label="Total" value={`$${(subtotal - Number(discount || 0)).toFixed(2)}`} bold />
    </View>
  );
};

export default OrderSummary;

const createStyles = (colors: any) =>
  StyleSheet.create({
    summary: {
      backgroundColor: colors.card,
      borderRadius: scaleWidth(12),
      padding: scaleWidth(16),
      marginBottom: scaleHeight(16),
    },
    summaryTitle: {
      fontFamily: fontFamily.poppins.semiBold,
      fontSize: fontSize.lg,
      color: colors.text,
      marginBottom: scaleHeight(8),
    },
    divider: { height: 1, backgroundColor: colors.border, marginVertical: scaleHeight(8) },
  });
