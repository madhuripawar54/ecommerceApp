import React from "react";
import {  StyleSheet } from "react-native";
import Input from "./Input";
import Icons from "../commonConfig/Icons";
import { scaleHeight, scaleWidth } from "../utils/responsive";

interface Props {
  value: string;
  onChange: (text: string) => void;
   containerStyle?: any;

}

const SearchBar: React.FC<Props> = ({ value, onChange}) => {

  return (
        <Input
        value={value}
        onChangeText={onChange}
        placeholder="Search here"
        leftIcon={<Icons.SearchBox />}
        containerStyle={[styles.container]}
        autoCorrect={false}
        returnKeyType="search"
      />
  );
};


const styles = StyleSheet.create({
  container: {
      marginHorizontal: scaleWidth(16),
      marginTop: scaleHeight(20),
      paddingHorizontal: scaleWidth(12),
      height: scaleHeight(48),
      borderRadius: 30,
      flexDirection: 'row',
      alignItems: 'center'
  },
});

export default SearchBar;