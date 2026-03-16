import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { useThemeStore } from '../store/theme.store';
import { scaleHeight, scaleWidth } from '../utils/responsive';
import { SafeAreaView } from 'react-native-safe-area-context';
import PRODUCT_DATA from '../screens/Data/products.json';
import { useNavigation } from '@react-navigation/native';
import Icons from '../commonConfig/Icons';
import { useFilterStore } from '../store/filter.store';
import ProductGrid from '../components/ProductGrid';
import SearchBar from '../components/SearchBar';

export default function SearchScreen() {
  const { theme } = useThemeStore();
  const styles = createStyles(theme.colors);
  const navigation = useNavigation();

  const [query, setQuery] = useState('');
  const filters = useFilterStore(state => state.filters);

  const PRODUCTS = useMemo(() => [...PRODUCT_DATA.featured, ...PRODUCT_DATA.popular], []);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    const base = !q ? PRODUCTS : PRODUCTS.filter(p => {
      return (
        String(p.name).toLowerCase().includes(q) ||
        String(p.description || '').toLowerCase().includes(q)
      );
    });

    // apply filters from filter store
    const result = base.filter(p => {
      // brand filter
      if (filters.brands && filters.brands.length && !(p as any).brand) return false;
      if (filters.brands && filters.brands.length && !filters.brands.includes((p as any).brand)) return false;
      // color filter - example: check p.color field if exists
      if (filters.colors && filters.colors.length && !(filters.colors.includes((p as any).color || ''))) return false;
      // price range
      if ((p as any).price < (filters.priceRange?.[0] || 0) || (p as any).price > (filters.priceRange?.[1] || Infinity)) return false;
      // gender
      if (filters.gender && filters.gender !== 'all' && (p as any).gender !== filters.gender) return false;

      return true;
    });

    return result;
  }, [query, PRODUCTS, filters]);

  const hasActiveFilters = Boolean(
    (filters.brands && filters.brands.length) ||
    (filters.colors && filters.colors.length) ||
    (filters.gender && filters.gender !== 'all') ||
    (filters.priceRange && (filters.priceRange[0] !== 0 || filters.priceRange[1] !== 1000))
  );



  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchButton}>
        <SearchBar
          value={query}
          onChange={setQuery}
          containerStyle={styles.searchBox}
        />

        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => (navigation as any).navigate('Filter')}
        >
          <Icons.BluePlus width={scaleWidth(20)} height={scaleHeight(20)} />
        </TouchableOpacity>
      </View>
      {(!query || !query.trim()) && !hasActiveFilters ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: theme.colors.textSecondary }}>Hit search — type the product you want</Text>
        </View>
      ) : (
        <ProductGrid
          data={filtered}
          ListEmptyComponent={
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: scaleHeight(100) }}>
              <Text style={{ color: theme.colors.textSecondary }}>No Product Available</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>

  );
}


const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      paddingHorizontal: scaleWidth(16),
    },
    searchButton: {
      marginTop: scaleHeight(16),
    },
    searchBox: {
      width: '100%',   
    },
    filterButton: {
      alignSelf: 'flex-end',   
      marginTop: scaleHeight(12),
      marginRight: scaleWidth(16),
    },
    colorBox: {
      width: scaleWidth(100),
      height: scaleHeight(100),
      backgroundColor: 'red',
      borderRadius: 12,
    },


    inputColor: {
      marginTop: scaleHeight(20),
      height: scaleHeight(40),
      width: scaleWidth(200),
      borderColor: colors.border,
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: scaleWidth(10),
      color: colors.text,
    }
  });