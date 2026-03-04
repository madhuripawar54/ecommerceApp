import { Image, StyleSheet} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { appImages } from "../utils/appImages";

const ProfilePic = () => {
    return (
        <SafeAreaView>
            <Image source={appImages.profilePic} 
            style={styles.circularImage}/>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    circularImage:{
        width: 48, 
        height: 48, 
        borderRadius: 24
    }
})
export default ProfilePic