import React, { useCallback, useEffect,useState } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { fetchProducts, Product as APIProduct } from '../api/mockProducts';
import ProductCard from './ProductCard';
import Input from './Input';
import { scaleHeight, scaleWidth } from '../utils/responsive';

type Props = {
  initialQuery?: string;
  pageSize?: number;
};

const ProductList: React.FC<Props> = ({ initialQuery = '', pageSize = 20 }) => {
  const styles = createStyles();

  const [query, setQuery] = useState(initialQuery);
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<APIProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const load = useCallback(async (pageToLoad = 1, replace = false) => {
    setLoading(true);
    try {
      const res = await fetchProducts({ page: pageToLoad, limit: pageSize, query });
      setHasMore(pageToLoad < res.totalPages);
      setPage(pageToLoad);
      setItems(prev => (replace ? res.data : [...prev, ...res.data]));
    } finally {
      setLoading(false);
    }
  }, [pageSize, query]);

  useEffect(() => { load(1, true); }, [load]);

  // debounced query effect
  useEffect(() => {
    const t = setTimeout(() => {
      load(1, true);
    }, 300);
    return () => clearTimeout(t);
  }, [query, load]);

  const onEndReached = useCallback(() => {
    if (!loading && hasMore) {
      load(page + 1, false);
    }
  }, [hasMore, load, loading, page]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await load(1, true);
    setRefreshing(false);
  }, [load]);

  const keyExtractor = useCallback((item: APIProduct) => String(item.id), []);

  const renderItem = useCallback(({ item }: { item: APIProduct }) => <ProductCard item={item as any} />, []);

  const getItemLayout = useCallback((_data: any, index: number) => ({ length: 180, offset: 180 * index, index }), []);

  return (
    <View style={styles.container}>
      <Input
        placeholder="Search products"
        value={query}
        onChangeText={setQuery}
        leftIcon={null}
        containerStyle={{ marginHorizontal: scaleWidth(12), marginBottom: scaleHeight(8) }}
      />

      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.6}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={11}
        removeClippedSubviews
        onRefresh={onRefresh}
        refreshing={refreshing}
        ListFooterComponent={loading ? <ActivityIndicator /> : null}
        getItemLayout={getItemLayout}
      />
    </View>
  );
};

export default ProductList;

const createStyles = () => StyleSheet.create({
  container: { flex: 1, paddingHorizontal: scaleWidth(8) },
});
