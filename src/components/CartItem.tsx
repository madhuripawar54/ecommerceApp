import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { scaleWidth, scaleHeight } from '../utils/responsive';
import { useThemeStore } from '../store/theme.store';
import Icons from '../commonConfig/Icons';
import { fontFamily, fontSize } from '../theme/fonts';
import useCartStore from '../store/cart.store';
import { ProductIcons } from '../assets/icons';

interface Props {
  item: any;
}

const CartItem: React.FC<Props> = ({ item }) => {
  const { theme } = useThemeStore();
  const styles = createStyles(theme.colors);

  const removeFromCart = useCartStore(state => state.removeFromCart);
  const updateQty = useCartStore(state => state.updateQty);

  const onInc = () => updateQty(item.id, item.qty + 1);
  const onDec = () => {
    if (item.qty <= 1) {
      removeFromCart(item.id);
    } else {
      updateQty(item.id, item.qty - 1);
    }
  };

  const SvgComp = typeof item.image === 'string' ? ProductIcons[item.image] : null;

  return (
    <View style={styles.card}>
      {SvgComp ? (
        <SvgComp width={scaleWidth(80)} height={scaleHeight(80)} />
      ) : (
        <Image source={{ uri: item.image }} style={styles.image} />
      )}

      <View style={styles.info}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.brand}>{item.brand}</Text>
        <Text style={styles.price}>${item.price}</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity onPress={() => removeFromCart(item.id)}>
          <Icons.DeleteIcon />
        </TouchableOpacity>

        <View style={styles.qtyRow}>
          <TouchableOpacity style={styles.circle} onPress={onDec}>
            <Text style={styles.qtyText}>−</Text>
          </TouchableOpacity>

          <Text style={styles.qty}>{String(item.qty).padStart(2, '0')}</Text>

          <TouchableOpacity style={styles.circle} onPress={onInc}>
            <Text style={styles.qtyText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CartItem;

const createStyles = (colors: any) =>
  StyleSheet.create({
    card: {
      flexDirection: 'row',
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: 12,
      marginBottom: scaleHeight(12),
    },
    image: {
      width: scaleWidth(80),
      height: scaleHeight(80),
      borderRadius: 12,
    },
    info: {
      flex: 1,
      marginLeft: 12,
    },
    title: {
      fontSize: fontSize.md,
      fontFamily: fontFamily.poppins.semiBold,
      color: colors.text,
    },
    brand: {
      fontSize: fontSize.sm,
      color: colors.textSecondary,
      marginVertical: 2,
    },
    price: {
      fontSize: fontSize.sm,
      color: colors.primary,
    },
    actions: {
      justifyContent: 'space-between',
      alignItems: 'flex-end',
    },
    qtyRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    circle: {
      width: 28,
      height: 28,
      borderRadius: 14,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    qtyText: {
      color: colors.background,
      fontSize: fontSize.md,
    },
    qty: {
      marginHorizontal: 8,
      color: colors.text,
    },
  });
