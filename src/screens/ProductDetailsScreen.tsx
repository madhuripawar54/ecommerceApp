import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { fontFamily, fontSize } from '../theme/fonts';
import { scaleWidth, scaleHeight } from '../utils/responsive';
import { useThemeStore } from '../store/theme.store';
// import useCartStore from '../store/cart.store';
import { ProductIcons } from '../assets/icons';
import Icons from '../commonConfig/Icons';
import CommonButton from '../components/CommonButton';
import useCartStore from '../store/cart.store';
// import CommonButton from '../components/CommonButton';

type RouteParams = {
product: {
    id: string;
    name: string;
    image: string;
    price: number;
    rating: number;
    reviews: number;
    description: string;
    sizes: number[];
  };
};

const ProductDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { product } = route.params as RouteParams;

  const { theme } = useThemeStore();
  const styles = createStyles(theme.colors);

  const SvgIcon = ProductIcons[product.image];

  const [selectedSize, setSelectedSize] = useState<string | number | undefined>(
    product.sizes && product.sizes.length ? product.sizes[0] : undefined
  );

  const addToCart = useCartStore(state => state.addToCart);

  const moveToCartScreen = () => {
    // add to cart then navigate
    addToCart(product, 1, selectedSize);
    (navigation as any).navigate('Cart'); 
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* IMAGE SECTION */}
              <View style={styles.imageWrapper}>
                  {SvgIcon ? (
                      <SvgIcon width="100%" height="100%" />) : <Image source={{ uri: product.image }} style={styles.image} />
                  }
                  <TouchableOpacity
                      style={styles.backButton}
                      onPress={() => navigation.goBack()}
                  >
                    <Icons.BackIcon  width={scaleWidth(24)} height={scaleHeight(24)}/>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.favButton}>
                      <Icons.Love  width={scaleWidth(24)} height={scaleHeight(22)}/>
                  </TouchableOpacity>
              </View>
        {/* CONTENT */}
        <View style={styles.content}>
          <View style={styles.row}>
            <Text style={styles.title}>{product.name}</Text>
            <Text style={styles.price}>${product.price}</Text>
          </View>

          <View style={styles.ratingRow}>
            <Text style={styles.star}>★</Text>
            <Text style={styles.rating}>{product.rating} ({product.reviews} Review)</Text>
          </View>

          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{product.description}</Text>

          <Text style={styles.sectionTitle}>Size</Text>

          <View style={styles.sizeRow}>
            {product.sizes.map(size => {
              const isSelected = selectedSize === size;
              return (
                <TouchableOpacity
                  key={String(size)}
                  style={[
                    styles.sizeBox,
                    isSelected && { backgroundColor: theme.colors.primary, borderColor: theme.colors.primary },
                  ]}
                  onPress={() => setSelectedSize(size)}
                >
                  <Text style={[styles.sizeText, isSelected && { color: theme.colors.background }]}>{size}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>

      {/* BOTTOM ACTION */}
  <View style={styles.bottomBar}>
         <CommonButton title="Buy Now" onPress={moveToCartScreen} fullWidth style={{ marginRight: scaleWidth(12) }} />
        <TouchableOpacity style={styles.cartButton}>
          <Icons.LuckIcon width={20} height={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductDetailsScreen;

/* -------------------------------- STYLES -------------------------------- */

const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      //backgroundColor: 'red',
      
    },

    imageWrapper: {
      width: '100%',
      height: scaleHeight(380),
      borderBottomLeftRadius: scaleWidth(24),
      borderBottomRightRadius: scaleWidth(24),
      borderTopLeftRadius: scaleWidth(24),
      borderTopRightRadius: scaleWidth(24),
      overflow: 'hidden',
    },

    image: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },

    backButton: {
      position: 'absolute',
      top: scaleHeight(65),
      left: scaleWidth(16),
      //backgroundColor: colors.white,
      padding: scaleWidth(10),
      borderRadius: 100,
      backgroundColor: '#D3D0D0',

    },

    favButton: {
      position: 'absolute',
      top: scaleHeight(65),
      right: scaleWidth(16),
      backgroundColor: '#D3D0D0',
      padding: scaleWidth(10),
      borderRadius: 100,  
    },

   
    content: {
      padding: scaleWidth(16),
    },

    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },

    title: {
      fontFamily: fontFamily.poppins.semiBold,
      fontSize: fontSize.lg,
      color: colors.text,
    },

    price: {
      fontFamily: fontFamily.poppins.bold,
      fontSize: fontSize.lg,
      color: colors.primary,
    },

    ratingRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: scaleHeight(6),
    },

    star: {
      color: '#F5A623',
      marginRight: 4,
    },

    rating: {
      fontFamily: fontFamily.poppins.medium,
      fontSize: fontSize.md,
      color: colors.textSecondary,
    },

    sectionTitle: {
      marginTop: scaleHeight(20),
      fontFamily: fontFamily.poppins.semiBold,
      fontSize: fontSize.lg,
      color: colors.text,
    },

    description: {
      marginTop: scaleHeight(6),
      //fontFamily: fontFamily.poppins.regular,
      fontSize: fontSize.sm,
      color: colors.textSecondary,
      lineHeight: 20,
    },

    sizeRow: {
      flexDirection: 'row',
      marginTop: scaleHeight(10),
      alignItems: 'center',
    },

    sizeBox: {
      width: scaleWidth(56),
      height: scaleHeight(44),
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 12,
      marginRight: scaleWidth(10),
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background,
    },

    sizeText: {
      fontFamily: fontFamily.poppins.medium,
      color: colors.text,
    },

    bottomBar: {
      flexDirection: 'row',
      padding: scaleWidth(16),
      borderTopWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.card,
      alignItems: 'center',
    },

    buyButton: {
      flex: 1,
      backgroundColor: colors.primary,
      paddingVertical: scaleHeight(14),
      borderRadius: 30,
      alignItems: 'center',
      marginRight: scaleWidth(12),
    },

    buyText: {
      fontFamily: fontFamily.poppins.medium,
      color: colors.white,
      fontSize: fontSize.md,
    },

    cartButton: {
      width: scaleWidth(56),
      height: scaleHeight(56),
      backgroundColor: colors.background,
      borderRadius: 28,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 6,
      elevation: 2,
    },

    cartIcon: {
      fontSize: 20,
    },
  });
