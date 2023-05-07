import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import { DrawerContent } from './components/DrawerContent';

import Hirek from './screens/News';
import Kedvencek from './screens/Favorites';
import Jaratok from './screens/Routes';
import Tervezo from './screens/RouteMaking';
import Terkep from './screens/Map';
import Beallitasok from './screens/Settings';

const Drawer = createDrawerNavigator();

export default class App extends Component {
    render() {
        return (
            <NavigationContainer>
                <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
                    <Drawer.Screen name="Kedvencek" component={Kedvencek} />
                    <Drawer.Screen name="Járatok" component={Jaratok} />
                    <Drawer.Screen name="Hírek" component={Hirek} />
                    <Drawer.Screen name="Útvonaltervező" component={Tervezo} />
                    <Drawer.Screen name="Térkép" component={Terkep} />
                    <Drawer.Screen name="Beállítások" component={Beallitasok} />
                </Drawer.Navigator>
            </NavigationContainer>
        );
    }
}