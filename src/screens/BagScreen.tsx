import React from 'react';
import { StyleSheet } from 'react-native';
import { useThemeStore } from '../store/theme.store';
import { scaleWidth } from '../utils/responsive';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import ProductGrid from '../components/ProductGrid';
import CommonHeader from '../components/CommonHeader';


export default function BagScreen({ route }: any) {
  const { theme } = useThemeStore();
  const styles = createStyles(theme.colors);
  const navigation = useNavigation<any>();

  
  // const PRODUCTS = [
  //   ...PRODUCT_DATA.featured,
  //   ...PRODUCT_DATA.popular,
  // ]; 
  
  const PRODUCTS = route.params?.products || [];
  const title = route.params?.title || 'Products';

  return (
    <SafeAreaView style={styles.container}>
      <ProductGrid
        data={PRODUCTS}
        ListHeaderComponent={
          <CommonHeader title={title} showBack onBack={() => navigation.goBack()} />
        }
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}

const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      paddingHorizontal: 16,
    },
    list: {
      marginTop: scaleWidth(16),
    },
  });
