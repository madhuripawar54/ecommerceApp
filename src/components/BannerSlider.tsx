import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
} from "react-native";
import { appColors } from "../utils/appColors";
import { appImages } from "../utils/appImages";

const { width } = Dimensions.get("window");

const banners = [
  {
    id: "1",
    title: "Get Winter Discount",
    highlight: "20% Off",
    subtitle: "For Children",
    image: appImages.profilePic,
  },
  {
    id: "2",
    title: "New Collection",
    highlight: "30% Off",
    subtitle: "Limited Time",
    image: appImages.profilePic,
  },
];

const BannerSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    setActiveIndex(viewableItems[0]?.index || 0);
  }).current;

  return (
    <View>
      <FlatList
        data={banners}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onViewableItemsChanged={onViewableItemsChanged}
        renderItem={({ item }) => (
          <View style={styles.banner}>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.highlight}>{item.highlight}</Text>
              <Text style={styles.subtitle}>{item.subtitle}</Text>
            </View>

            <Image source={item.image} style={styles.image} />
          </View>
        )}
      />

      {/* Dots */}
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

const styles = StyleSheet.create({
  banner: {
    width: width - 40,
    marginHorizontal: 10,
    borderRadius: 24,
    padding: 20,
    backgroundColor: "#5E5CE6",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textContainer: {
    flex: 1,
  },
  title: {
    color: appColors.white,
    fontSize: 18,
    fontWeight: "500",
  },
  highlight: {
    color: appColors.white,
    fontSize: 28,
    fontWeight: "bold",
    marginVertical: 4,
  },
  subtitle: {
    color: appColors.white,
    fontSize: 18,
  },
  image: {
    width: 110,
    height: 140,
    resizeMode: "contain",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 12,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: appColors.grey300,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: appColors.bannerBackgroundColor,
  },
});

export default BannerSlider;