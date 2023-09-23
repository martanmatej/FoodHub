import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainScreen from './Components/MainScreen';
import { useFonts } from 'expo-font';
import {useCallback, useState} from 'react';
import SettingScreen from './Components/SettingScreen';
import { createGlobalState } from 'react-hooks-global-state';
import InitScreen from './Components/InitScreen';


const Stack = createNativeStackNavigator();


export default function App() {
  
  const [fontsLoaded] = useFonts({
    bold: require("../FoodHub/assets/fonts/SourceSansProBold.otf"),
    semiBold: require("../FoodHub/assets/fonts/SourceSansProSemibold.otf"),
    regular: require("../FoodHub/assets/fonts/SourceSansProRegular.otf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={MainScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name='Settings'
          component={SettingScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name='Init'
          component={InitScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
