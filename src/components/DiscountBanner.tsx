import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { scaleWidth, scaleHeight, scale } from '../utils/responsive';
import { useThemeStore } from '../store/theme.store';
import Icons from '../commonConfig/Icons';
import { fontFamily, fontSize } from '../theme/fonts';
import Text from './Text';

interface Props {
  banners: string[];
}

const DiscountBanner: React.FC<Props> = ({ banners }) => {
  const { theme } = useThemeStore();
  const styles = createStyles(theme.colors);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <View style={styles.container}>
      <Carousel
        width={scaleWidth(343)}
        height={scaleHeight(135)}
        data={banners}
        autoPlay
        autoPlayInterval={2500}
        scrollAnimationDuration={900}
        onSnapToItem={index => setActiveIndex(index)}
        renderItem={() => (
          <View style={styles.card}>
              <View style={styles.cardRow}>
              <View style={styles.textColumn}>
                <Text
                  variant="caption"
                  style={[
                    styles.text,
                    { fontFamily: fontFamily.poppins.semiBold, fontSize: fontSize.xs, lineHeight: fontSize.xxl, letterSpacing: 0 },
                  ]}
                >
                  {'Get Winter Discount'}
                </Text>

                <Text
                  style={[
                    styles.text,
                    {
                      fontFamily: fontFamily.poppins.semiBold,
                      fontSize: fontSize.lg,
                      lineHeight: fontSize.xxl,
                      letterSpacing: 0,
                    },
                  ]}
                >
                  {'20% Off'}
                </Text>

                <Text
                  variant="caption"
                  style={[
                    styles.text,
                    { fontFamily: fontFamily.poppins.semiBold, fontSize: fontSize.xs, lineHeight: fontSize.xxl, letterSpacing: 0 },
                  ]}
                >
                  {'For Children'}
                </Text>
              </View>

              <View style={styles.imageWrapper}>
                <Icons.Banner width="100%" height="100%" />
              </View>
            </View>
          </View>
        )}
      />

      <View style={styles.pagination}>
        {banners.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              activeIndex === index && styles.activeDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export default DiscountBanner;


const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      marginTop: scaleHeight(10),
      alignItems: 'center',
    },

    card: {
      width: scaleWidth(343),
      height: scaleHeight(135),
      borderRadius: scale(16),
      flexDirection: 'row',
      alignItems: 'center',
      padding: scaleWidth(16),
      backgroundColor: colors.primary,
    },

    cardRow: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    textColumn: { flexDirection: 'column', alignItems: 'center', justifyContent: 'center' },

    text: {
      color: colors.background, 
      fontFamily: fontFamily.poppins.semiBold,
      fontSize: fontSize.sm,
      lineHeight: 24,
      textAlign: 'center',
    },

    imageWrapper: {
      width: scaleWidth(89),
      height: scaleHeight(140),
      justifyContent: 'center',
      alignItems: 'center',
    },

    pagination: {
      flexDirection: 'row',
      marginTop: scaleHeight(8),
    },

    dot: {
      width: scaleWidth(8),
      height: scaleWidth(8),
      borderRadius: scaleWidth(4),
      backgroundColor: colors.border,
      marginHorizontal: scaleWidth(4),
    },

    activeDot: {
      width: scaleWidth(16),
      backgroundColor: colors.primary,
    },
  });
