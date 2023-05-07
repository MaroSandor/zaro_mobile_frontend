import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import { DrawerContent } from './components/DrawerContent';

import Hirek from './screens/News';
import Kedvencek from './screens/Favorites';
import Jaratok from './screens/Routes';
import Tervezo from './screens/RouteMaking';
import Terkep from './screens/Map';
import Beallitasok from './screens/Settings';
import { StatusBar } from 'expo-status-bar';

/**
 * SplashScreen
 * NetInfo
 * Járatok részletes infói - Modal
 * (esetleg ezt az App.js-t és a components\DrawerContent.js-t átírni class componentre)
 */
const Drawer = createDrawerNavigator();

export default function App() {
  return (
  <>
  <StatusBar style='light' />
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={props => <DrawerContent {...props} />}
        screenOptions={{
          headerStyle: { backgroundColor: '#14181b' },
          headerTitleStyle: { color: 'white' },
          headerTintColor: 'white'
        }}>
        <Drawer.Screen name="Kedvencek" component={Kedvencek} />
        <Drawer.Screen name="Járatok" component={Jaratok} />
        <Drawer.Screen name="Hírek" component={Hirek} />
        <Drawer.Screen name="Útvonaltervező" component={Tervezo} />
        <Drawer.Screen name="Térkép" component={Terkep} />
        <Drawer.Screen name="Beállítások" component={Beallitasok} />
      </Drawer.Navigator>
    </NavigationContainer>
    </>
  );
}