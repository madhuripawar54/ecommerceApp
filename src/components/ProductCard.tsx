import React, { useMemo } from 'react';
import { View, StyleSheet, Image, Platform, TouchableOpacity } from 'react-native';
import { ProductIcons } from '../assets/icons';
import { useThemeStore } from '../store/theme.store';
import { useNavigation } from '@react-navigation/native';
import Text from './Text';
import { scaleWidth, scaleHeight, scale } from '../utils/responsive';
import useFavoritesStore from '../store/favorites.store';

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  love: string
};

const ProductCard: React.FC<{ item: Product }> = ({ item }) => {
  const SvgIcon =  useMemo(() => ProductIcons[item.image], [item.image]);
  const LoveIcon = useMemo(() => ProductIcons[item.love], [item.love]);

  const { theme } = useThemeStore();
  const styles = useMemo(() => createStyles(theme.colors), [theme.colors]);
  const navigation = useNavigation<any>();
  
  const { toggleFavorite, isFavorite } = useFavoritesStore();
  const isFav = isFavorite(item.id);

  const moveToProductDetails = () => {  
    (navigation as any).navigate('ProductDetailsScreen', {
      product: item,
    });
  };

  const handleFavoritePress = (e: any) => {
    e.stopPropagation();
    toggleFavorite(item.id);
  };



  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.8} onPress={moveToProductDetails}>
      <View style={styles.media}>
        {LoveIcon && (
          <TouchableOpacity 
            style={styles.loveIcon} 
            onPress={handleFavoritePress}
            activeOpacity={0.7}
          >
            <LoveIcon 
              width={24} 
              height={24} 
              fill={isFav ? theme.colors.primary : 'none'}
              stroke={isFav ? theme.colors.primary : theme.colors.textSecondary}
            />
          </TouchableOpacity>
        )}
        {SvgIcon ? (
          <SvgIcon width={'100%'} height={'100%'} preserveAspectRatio="xMidYMid slice" />
        ) : (
          <Image
            style={styles.img}
            resizeMode="cover"
          />
        )}
      </View>
      <View style={styles.content}>
      <Text variant="title" numberOfLines={1} maxChars={20} style={styles.name}>{item.name}</Text>
      <Text variant="subtitle"  style={styles.price}>${item.price}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;

const createStyles = (colors: any) =>
  StyleSheet.create({
    card: {
      borderRadius: scale(10),
      backgroundColor: colors.bgSearch,
      overflow: Platform.OS === 'android' ? 'hidden' : ('visible' as any),
      marginLeft: scaleWidth(16),
    },
    media: {
      width: scaleWidth(126),
      height: scaleHeight(99),
      borderTopLeftRadius: scale(10),
      borderTopRightRadius: scale(10),
      overflow: 'hidden',
      justifyContent: 'center',
      alignItems: 'center',
    },
    content: {
      width: scaleWidth(126),
      paddingHorizontal: scale(8),
      height: scaleHeight(44),
    },
    loveIcon: {
      position: 'absolute',
      top: scale(8),
      right: scale(8),
      borderRadius: scale(14),
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 10,
    },
    img: {
      width: '100%',
      height: '100%',
    },
    name: {
      //marginTop: scale(4),
    },
    price: {
      marginBottom: scale(2),
    }
  });
