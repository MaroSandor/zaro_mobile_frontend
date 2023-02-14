import React, { Component } from 'react';
import { Animated, ScrollView, View, Text, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// screens
import Home from './screens/welcomeScreen';
import Login from './components/Login';

const Stack = createNativeStackNavigator();

export default class Content extends Component {
    render() {
        return (
            <NavigationContainer style={styles.content}>
                <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Home" component={Home} />
                    <Stack.Screen name="Login" component={SplashScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        paddingTop: Dimensions.get('window').height * 0.33,
        backgroundColor: '#5a57ab'
    }
})