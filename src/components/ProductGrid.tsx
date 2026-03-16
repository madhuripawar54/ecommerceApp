import React from 'react';
import { FlatList, StyleSheet, Platform, View } from 'react-native';
import { useThemeStore } from '../store/theme.store';
import { scaleHeight } from '../utils/responsive';
import ProductGridCard from './ProductGridCard';
import Text from './Text';

type Product = {
  id: number | string;
  name: string;
  price: number;
  image: string;
  love?: string;
  plusicon?: string;
  [key: string]: any;
};

type ProductGridProps = {
  data: Product[];
  ListHeaderComponent?: React.ReactElement | null;
  ListEmptyComponent?: React.ReactElement | null;
  contentContainerStyle?: any;
  onEndReached?: () => void;
  onEndReachedThreshold?: number;
};

const ProductGrid: React.FC<ProductGridProps> = ({
  data,
  ListHeaderComponent,
  ListEmptyComponent,
  contentContainerStyle,
  onEndReached,
  onEndReachedThreshold = 0.5,
}) => {
  const { theme } = useThemeStore();
  const styles = createStyles(theme.colors);

  const defaultEmptyComponent = (
    <View style={styles.emptyContainer}>
      <Text variant="body" style={styles.emptyText}>No products found</Text>
    </View>
  );

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <ProductGridCard item={item} />}
      keyExtractor={item => String(item.id)}
      numColumns={2}
      columnWrapperStyle={styles.row}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[styles.list, contentContainerStyle]}
      ListHeaderComponent={ListHeaderComponent}
      ListEmptyComponent={ListEmptyComponent || defaultEmptyComponent}
      nestedScrollEnabled={true}
      removeClippedSubviews={Platform.OS === 'android' ? false : true}
      scrollEnabled={true}
      bounces={true}
      onEndReached={onEndReached}
      onEndReachedThreshold={onEndReachedThreshold}
    />
  );
};

export default ProductGrid;

const createStyles = (colors: any) =>
  StyleSheet.create({
    list: {
      paddingBottom: scaleHeight(20),
    },
    row: {
      justifyContent: 'space-between',
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: scaleHeight(100),
    },
    emptyText: {
      color: colors.textSecondary,
    },
  });

