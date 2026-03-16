
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';

function App() {

  return (
    <SafeAreaProvider>
      <AppNavigator/>
    </SafeAreaProvider>  
    // <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:'red',height:500}}></View>
  );
}



export default App;
