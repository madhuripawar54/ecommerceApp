import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Text from './Text';
import { scaleWidth, scaleHeight, scale, scaleFont } from '../utils/responsive';
import { fontFamily } from '../theme/fonts';
import Icons from '../commonConfig/Icons';
import { useThemeStore } from '../store/theme.store';
import CommonButton from './CommonButton';

type Props = {
    id: number;
    name: string;
    brand?: string;
    price: number;
    image?: string;
    onPress?: () => void;
    onTrack?: () => void;
};

const OrderCard: React.FC<Props> = ({ name, brand, price, image, onPress, onTrack }) => {
    const Img = image ? (Icons as any)[image] : null;
    const { theme } = useThemeStore();
    const colors = theme.colors;

    return (
        <TouchableOpacity style={[styles.card, { backgroundColor: colors.card }]} onPress={onPress} activeOpacity={0.9}>
            <View style={[styles.leftImage, { backgroundColor: colors.bgSearch }]}>{Img ? <Img width={'100%'} height={'100%'} /> : null}</View>

            <View style={styles.info}>
                <Text variant="title" style={[styles.name, { color: colors.itemName }]}>{name}</Text>
                {brand ? <Text variant="caption" style={[styles.brand, { color: colors.placeText }]}>{brand}</Text> : null}
                <Text variant="body" style={[styles.price, { color: colors.primary }]}>${price}</Text>
            </View>

            <CommonButton
                title="Track Order"
                onPress={onTrack || (() => { })}
                width={scaleWidth(96)}
                height={scaleHeight(36)}
                bgColor={colors.primary}
                textColor={colors.background}
                style={[styles.trackBtn, { borderRadius: scale(18) }]}
                textStyle={{
                    fontFamily: fontFamily.poppins.semiBold,
                    fontSize: scaleFont(12),
                    lineHeight: scaleFont(12),
                    letterSpacing: 0,
                }}
            />
        </TouchableOpacity>
    );
};

export default OrderCard;

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: scale(12),
        marginVertical: scaleHeight(8),
        shadowColor: '#000',
        shadowOpacity: 0.03,
        shadowRadius: 8,
        elevation: 1,
        width: scaleWidth(343),
        height: scaleHeight(110),
    },
    leftImage: {
        width: scaleWidth(126),
        height: scaleHeight(99),
        borderRadius: scale(8),
        overflow: 'hidden',
        backgroundColor: '#eee',
    },
    info: {
        flex: 1,
        marginLeft: 12,
    },
    name: { fontFamily: fontFamily.poppins.semiBold },
    brand: { color: '#9A9A9A', marginTop: 4 },
    price: { color: '#6055D8', marginTop: 6 },
    trackBtn: {
        position: 'absolute',
        right: scaleWidth(12),
        bottom: scaleHeight(12),
    },
    trackText: { color: '#fff' },
});
