import Header from "../components/Header"
import { StyleSheet, View } from "react-native"
import SearchBar from "../components/SearchBar"
import BannerSlider from "../components/BannerSlider"
import ProductSection from "../components/ProductSection"
// import { useNavigation } from "@react-navigation/native"; // Import the hook
import { featuredProducts } from "../data/featuredProducts"

const Home = () => {
    // const navigation = useNavigation(); // Get the navigation object
    return (
        <View style={styles.styleHome}>
            <Header userName={"Madhuri"}/>
            <SearchBar/>
            <BannerSlider/>

            <ProductSection
            title="Featured"
            data={featuredProducts}
            onSeeAllPress={()=>{}}
            onItemPress={()=>{}}
            // onSeeAllPress={() => navigation.navigate("")}
            // onItemPress={(item) =>
            //     navigation.navigate("ProductDetail", { product: item })
            // }
            />
            <ProductSection
            title="Most Popular"
            data={featuredProducts}
            onSeeAllPress={()=>{}}
            onItemPress={()=>{}}
            // onSeeAllPress={() => navigation.navigate("")}
            // onItemPress={(item) =>
            //     navigation.navigate("ProductDetail", { product: item })
            // }
            />

            </View>
    )
}

const styles = StyleSheet.create({
    styleHome:{
        flex: 1,
        padding: 10,
    }
})

export default Home

