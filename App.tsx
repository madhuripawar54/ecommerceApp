
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Home from './src/screens/Home';
import { View } from 'react-native';

function App() {

  return (
    <SafeAreaProvider>
      <Home />
    </SafeAreaProvider>  
    // <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:'red',height:500}}></View>
  );
}



export default App;
