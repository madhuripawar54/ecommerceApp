import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { appColors } from "../utils/appColors";

interface Product {
  id: string;
  name: string;
  price: number;
  image: any;
}

interface Props {
  title: string;
  data: Product[];
  onSeeAllPress: () => void;
  onItemPress: (item: Product) => void;
}

const ProductSection: React.FC<Props> = ({
  title,
  data,
  onSeeAllPress,
  onItemPress,
}) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity onPress={onSeeAllPress}>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>

      {/* Product List */}
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => onItemPress(item)}
          >
            <Image source={item.image} style={styles.image} />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.price}>${item.price}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: appColors.grey900,
  },
  seeAll: {
    color: "#5E5CE6",
    fontWeight: "500",
  },
  card: {
    width: 150,
    marginRight: 15,
    backgroundColor: appColors.white,
    borderRadius: 16,
    padding: 10,
  },
  image: {
    width: "100%",
    height: 120,
    marginBottom: 8,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  productName: {
    fontSize: 16,
    fontWeight: "600",
    color: appColors.grey800,
  },
  price: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#5E5CE6",
    marginTop: 4,
  },
});

export default ProductSection;
