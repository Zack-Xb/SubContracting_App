import React from 'react'
import { setStatusBarStyle, StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider,DefaultTheme } from 'react-native-paper';
import {theme} from './src/theme/theme';
import '@expo/match-media'
import { Constants } from 'expo-constants';
import { useFonts } from 'expo-font';
import { useMediaQuery } from "react-responsive";

import Home from './src/Screens/Home';
import Login from './src/Screens/Login';
import SignUp from './src/Screens/SignUp';
import {Header} from './src/components/Header';
import { Navbar } from './src/components/Navbar';
import { Layout } from './src/components/Layout';
import {Bnav} from './src/components/Bnav';
import {UserTypes} from  './src/Screens/UserTypes';
import {ServiceType} from './src/Screens/ServiceType';
import { Orders } from './src/Screens/Orders';
import { Inbox } from './src/Screens/Inbox';
import { Profile } from './src/Screens/Profile';
import {ServiceHome} from './src/Screens/ServiceHome';
import {ServiceBnav} from './src/components/ServiceBnav'
import {ListPackages} from './src/Screens/Tools/ListPackages';
import {EditPackages} from './src/Screens/Tools/EditPackages';
import {ListProject} from './src/Screens/ProjectMTools/ListProject';
import {EditProjects} from './src/Screens/ProjectMTools/EditProjects';
import {EditProject} from './src/Screens/EditTools./EditProject'
import {EditPackage} from './src/Screens/EditTools./EditPackage'
import {Package} from './src/Screens/Posts/Package';
import {Project} from './src/Screens/Posts/Project';
import {SetDisplay} from './src/Screens/Tools/SetDisplay';
import {EditDisplay} from './src/Screens/Tools/EditDisplay';

const Stack= createNativeStackNavigator();


export default function App() {

  const isTabletOrMobileDevice = useMediaQuery({    
    maxDeviceWidth: 1224,
 });

  const [loaded] = useFonts({
    Oswald: require('./src/assets/oswald/Oswald-Regular.ttf'),
    Raleway: require('./src/assets/raleway/static/Raleway-Regular.ttf'),
    
  });
  
  if (!loaded) {
    return null;
  }
  if(isTabletOrMobileDevice){
    return (
  
      <PaperProvider theme={DefaultTheme}>
      <NavigationContainer>
   <Stack.Navigator initialRouteName='Login' screenOptions={{headerShown: false}}>
          <Stack.Screen name='Home' component={Home} /> 
          <Stack.Screen name='Login' component={Login} />
          <Stack.Screen name='SignUp' component={SignUp} />
          <Stack.Screen name='B' component={Bnav} />
          <Stack.Screen name='UserType' component={UserTypes} />
          <Stack.Screen name='ServiceType' component={ServiceType} />
          <Stack.Screen name='SB' component={ServiceBnav} />
          <Stack.Screen name='List' component={ListPackages} />
          <Stack.Screen name='Edit' component={EditPackages} />
          <Stack.Screen name='ListProj' component={ListProject} />
          <Stack.Screen name='EditProj' component={EditProjects} />
          <Stack.Screen name='editProjx' component={EditProject} />
          <Stack.Screen name='editPackx' component={EditPackage} />
          <Stack.Screen name='dispPack' component={Package} />
          <Stack.Screen name='dispProj' component={Project} />
          <Stack.Screen name='setDisp' component={SetDisplay} />
          <Stack.Screen name='editDisp' component={EditDisplay} />
      </Stack.Navigator>
      </NavigationContainer>
      </PaperProvider>
    );
  }else{  return (
  
    <PaperProvider theme={DefaultTheme}>
    <NavigationContainer>
 <Stack.Navigator initialRouteName='Login' screenOptions={{headerShown: false}}>
        <Stack.Screen name='Home' component={Home} /> 
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='SignUp' component={SignUp} />
        <Stack.Screen name='B' component={Bnav} />
        <Stack.Screen name='UserType' component={UserTypes} />
          <Stack.Screen name='ServiceType' component={ServiceType} />
          <Stack.Screen name='Orders' component={Orders} />
          <Stack.Screen name='Inbox' component={Inbox} />
          <Stack.Screen name='Profile' component={Profile} />
          <Stack.Screen   name='ServiceHome' component={ServiceHome}/>
          <Stack.Screen name='List' component={ListPackages} />
          <Stack.Screen name='Edit' component={EditPackages} />
          <Stack.Screen name='ListProj' component={ListProject} />
          <Stack.Screen name='EditProj' component={EditProjects} />
          <Stack.Screen name='editProjx' component={EditProject} />
          <Stack.Screen name='editPackx' component={EditPackage} />
          <Stack.Screen name='dispPack' component={Package} />
          <Stack.Screen name='dispProj' component={Project} />
          <Stack.Screen name='setDisp' component={SetDisplay} />
          <Stack.Screen name='editDisp' component={EditDisplay} />
    </Stack.Navigator>
    </NavigationContainer>
    </PaperProvider>
  );
  
    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

