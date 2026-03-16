import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useThemeStore } from '../store/theme.store';
import { scaleHeight, scaleWidth } from '../utils/responsive';
import { ProductIcons } from '../assets/icons';
import { useNavigation } from '@react-navigation/native';
import Text from './Text';
import { useFavoritesStore } from '../store/favorites.store';

type Product = {
  id: number | string;
  name: string;
  price: number;
  image: string;
  love?: string;
  plusicon?: string;
};

type ProductGridCardProps = {
  item: Product;
};

const ProductGridCard: React.FC<ProductGridCardProps> = ({ item }) => {
  const { theme } = useThemeStore();
  const navigation = useNavigation<any>();
  const { toggleFavorite, isFavorite } = useFavoritesStore();
  const styles = createStyles(theme.colors);

  const SvgIcon = ProductIcons[item.image];
  const LoveIcon = item.love ? ProductIcons[item.love] : null;
  const PlusIcon = item.plusicon ? ProductIcons[item.plusicon] : null;

  const moveToProductDetails = () => {
    navigation.navigate('ProductDetailsScreen', {
      product: item,
    });
  };

  const isFav = isFavorite(item.id);

  return (
    <View style={styles.card}>
      <View style={styles.imageWrapper}>
        {LoveIcon && (
          <TouchableOpacity
            style={[
              styles.favButton,
              { backgroundColor: theme.colors.bgSearch },
            ]}
            onPress={() => toggleFavorite(item.id)}
            activeOpacity={0.7}
          >
            <LoveIcon 
              width={20} 
              height={20} 
              fill={isFav ? theme.colors.primary : 'none'}
              stroke={isFav ? theme.colors.primary : theme.colors.textSecondary}
              strokeWidth={isFav ? 0 : 1.5}
            />
          </TouchableOpacity>
        )}

        {SvgIcon ? (
          <SvgIcon
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
          />
        ) : (
          <Image
            // source={require('../../assets/images/watch.png')}
            style={styles.image}
            resizeMode="cover"
          />
        )}
      </View>

      <View style={styles.footer}>
        <View style={styles.sm_footer}>
          <Text variant="title" numberOfLines={1}>
            {item.name}
          </Text>
          <Text variant="subtitle" style={{marginTop: scaleHeight(1)}}>${item.price}</Text>
        </View>

        {PlusIcon && (
          <TouchableOpacity style={styles.addButton} onPress={moveToProductDetails}>
            <PlusIcon width={20} height={20} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default ProductGridCard;

const createStyles = (colors: any) =>
  StyleSheet.create({
    card: {
      width: scaleWidth(155),
      height: scaleHeight(178),
      backgroundColor: colors.card,
      borderRadius: 18,
      marginBottom: scaleHeight(16),
    },
    imageWrapper: {
      width: scaleWidth(155),
      height: scaleHeight(134),
      borderRadius: 14,
      overflow: 'hidden',
    },
    image: {
      width: '100%',
      resizeMode: 'cover',
    },
    favButton: {
      position: 'absolute',
      top: 10,
      right: 10,
      width: 28,
      height: 28,
      borderRadius: 14,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 10,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: scaleWidth(12),
      paddingTop: scaleHeight(8),
    },
    sm_footer: {
      flex: 1,
    },
    addButton: {
      width: scaleWidth(24),
      height: scaleHeight(24),
    },
  });

