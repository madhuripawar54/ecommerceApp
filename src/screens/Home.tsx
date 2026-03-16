import React, { useState, useMemo } from 'react';
import {View, FlatList, TouchableOpacity} from 'react-native';
import {useThemeStore} from '../store/theme.store';
import Header from '../components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import { scaleWidth, scaleHeight } from '../utils/responsive';
import ProductCard from '../components/ProductCard';
import Text from '../components/Text';
import ProductGrid from '../components/ProductGrid';
import SearchBar from '../components/SearchBar';
import PRODUCT_DATA from '../screens/Data/products.json';
import BannerSlider from '../components/BannerSlider';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
  const navigation = useNavigation<any>();
  const {theme} = useThemeStore();
  const [search, setSearch] = useState('');

  const ALL_PRODUCTS = useMemo(() => [
    ...PRODUCT_DATA.featured,
    ...PRODUCT_DATA.popular,
  ], []);

  const filteredProducts = useMemo(() => {
    if (!search || !search.trim()) {
      return [];
    }
    const query = search.toLowerCase().trim();
    return ALL_PRODUCTS.filter(product => {
      return (
        String(product.name || '').toLowerCase().includes(query) ||
        String(product.description || '').toLowerCase().includes(query)
      );
    });
  }, [search, ALL_PRODUCTS]);

  const showSearchResults = search.trim().length > 0;

 

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: theme.colors.background,
    }}>
      <Header userName="John William"/>
      <SearchBar value={search} onChange={setSearch}/>
      
      {showSearchResults ? (
        <ProductGrid
          data={filteredProducts}
          contentContainerStyle={{ paddingHorizontal: scaleWidth(16), paddingTop: scaleHeight(16) }}
        />
      ) : (
        <>
          <View>
            <BannerSlider />
          </View>
          <Section title="Featured" data={PRODUCT_DATA.featured} navigation={navigation}/>
          <Section title="Most Popular" data={PRODUCT_DATA.popular} navigation={navigation}/>
        </>
      )}
    </SafeAreaView>
  );
}


interface SectionProps {
  title: string;
  data: any[];
  navigation: any;  
}
const Section: React.FC<SectionProps> = ({ title, data ,navigation}) => (

  <View>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' , padding: scaleWidth(16)}}>
      <Text variant="title">{title}</Text>
      <TouchableOpacity onPress={()=>navigation.navigate('BagScreen',{ products: data,title: title})}>
      <Text variant="caption" style={{ color: '#6055D8' }}>See All</Text>
      </TouchableOpacity>     
    </View>
   
    <FlatList
      data={data}
      showsHorizontalScrollIndicator={false}
      horizontal
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ paddingLeft: scaleWidth(0) }}
      renderItem={({ item }) => <ProductCard item={item} />}
    />
  </View>
);
