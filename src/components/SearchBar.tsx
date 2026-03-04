import React from "react";
import { View, TextInput, StyleSheet, Image } from "react-native";
import { appColors } from "../utils/appColors";
import { appImages } from "../utils/appImages";

const SearchBar = () => {
  return (
    <View style={styles.container}>
        <Image
        source={appImages.searchIcon}
        style={styles.icon}
        />      
        <TextInput
        placeholder="Search..."
        placeholderTextColor="#9CA3AF"
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    paddingHorizontal: 12,
    height: 45,
    marginTop: 15,
    backgroundColor: appColors.appBackground,
  },
  icon: {
    width: 18,
    height: 18,
    marginRight: 8,
    resizeMode: 'contain',
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: appColors.primaryText,
  },
});

export default SearchBar;