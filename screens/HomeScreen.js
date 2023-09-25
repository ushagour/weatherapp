import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Image, ScrollView, ImageBackground, useWindowDimensions } from 'react-native';

export default function App() {
  const { width:windowWidth, height:windowHeight}= useWindowDimensions();
  return (
        <ScrollView >
        <StatusBar style="light" />
        <View style={{width:windowHeight,height:windowHeight}}>
        <ImageBackground blurRadius={20} source={require('../assets/night2.jpg')} style={{flex:1}}/>
        </View>
        </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
