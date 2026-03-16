import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CommonHeader from '../components/CommonHeader';
import Text from '../components/Text';
import { scaleWidth, scaleHeight, scale } from '../utils/responsive';
import { useThemeStore } from '../store/theme.store';
import CommonButton from '../components/CommonButton';
import { useFilterStore } from '../store/filter.store';
import data from './Data/generateProducts';
import Chip from '../components/Chip';
import RangeSlider from '../components/RangeSlider';

const COLOR_OPTIONS = ['White', 'Black', 'Grey', 'Yellow', 'Red', 'Green'];

export default function FilterScreen({ navigation }: any) {
    const { theme } = useThemeStore();
    const colors = theme.colors;
    const styles = createStyles(colors);

    const filters = useFilterStore(state => state.filters);
    const setGender = useFilterStore(state => state.setGender);
    const toggleBrand = useFilterStore(state => state.toggleBrand);
    const toggleColor = useFilterStore(state => state.toggleColor);
    const setPriceRange = useFilterStore(state => state.setPriceRange);
    const clear = useFilterStore(state => state.clear);

    // derive brands and price range from generated products
    const allProducts = [...data.featured, ...data.popular];
    const brands = Array.from(new Set(allProducts.map(p => p.name)));
    const prices= allProducts.map(p => p.price);
    const minPrice = prices.length ? Math.min(...prices) : 0;
    const maxPrice = prices.length ? Math.max(...prices) : 1000;

    const onRangeChange = (low: number, high: number) => {
        setPriceRange([low, high]);
    };

    return (
        <SafeAreaView style={styles.container}>
            <CommonHeader title="Filter" showBack onBack={() => navigation.goBack()} />
            <ScrollView contentContainerStyle={{ padding: scaleWidth(16) }}>
                <Text variant="title">Gender</Text>
                <View style={styles.row}>
                    {['all', 'men', 'women'].map(g => (
                        <TouchableOpacity key={g} onPress={() => setGender(g as any)} style={[styles.chip, filters.gender === g ? styles.chipActive : undefined]}>
                            <Text variant="body" style={filters.gender === g ? styles.chipTextActive : styles.chipText}>{g === 'all' ? 'All' : (g.charAt(0).toUpperCase() + g.slice(1))}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <Text variant="title" style={{ marginTop: scaleHeight(16) }}>Brand</Text>
                <View style={styles.rowWrap}>
                    {brands.map(b => (
                        <Chip key={b} label={b} selected={filters.brands.includes(b)} onPress={() => toggleBrand(b)} />
                    ))}
                </View>

                <Text variant="title" style={{ marginTop: scaleHeight(16) }}>Price Range</Text>
                <View style={{ marginTop: scaleHeight(8), marginBottom: scaleHeight(12) }}>
                    <Text variant="body">${filters.priceRange[0]} - ${filters.priceRange[1]}</Text>
                    <RangeSlider min={minPrice} max={maxPrice} low={filters.priceRange[0]} high={filters.priceRange[1]} onValuesChange={onRangeChange} />
                </View>

                <Text variant="title" style={{ marginTop: scaleHeight(16) }}>Color</Text>
                <View style={styles.rowWrap}>
                    {COLOR_OPTIONS.map(c => (
                        <Chip key={c} label={c} selected={filters.colors.includes(c)} onPress={() => toggleColor(c)} style={
                            {
                                paddingVertical: scaleHeight(10),
                                paddingHorizontal: scaleWidth(28),
                                borderRadius: scale(12),
                                gap: scaleWidth(12),
                                flexWrap: 'wrap'

                            }
                        } />
                    ))}
                </View>
                <CommonButton title="Another option" onPress={() => { clear(); }} width={scaleWidth(343)} bgColor={colors.bgSearch} textColor={colors.text} style={{ marginBottom: scaleHeight(12) }} />
                <CommonButton title="Apply Filter" onPress={() => navigation.goBack()} width={scaleWidth(343)} bgColor={colors.primary} textColor={colors.background} />
            </ScrollView>
        </SafeAreaView>
    );
}

const createStyles = (colors: any) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background
        },
        row: {
            flexDirection: 'row',
            marginTop: scaleHeight(12)
        },
        rowWrap: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginTop: scaleHeight(12),
            gap: scaleWidth(12)
        },
        chip: {
            paddingVertical: scaleHeight(10),
            paddingHorizontal: scaleWidth(28),
            borderRadius: scale(12),
            backgroundColor: colors.card,
            marginBottom: scaleHeight(12),
            marginRight: scaleWidth(24),
            gap: scaleWidth(12),

        },
        chipActive: { backgroundColor: colors.primary },
        chipText: { color: 'rgba(0, 0, 0, 0.5)' },
        chipTextActive: { color: colors.background },
    });
