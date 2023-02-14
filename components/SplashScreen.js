import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Animated, Dimensions } from 'react-native';

import Login from './Login';

const BGColor = '#4D4A95';
const Logo = require('../assets/pics/welcome-logo_transparent.png');

class SplashScreen extends Component {

    // Animation value...
    startAnimation = new Animated.Value(0);

    // Move logo...
    moveLogo = new Animated.ValueXY({ x: 0, y: 0 })

    componentDidMount() {

        // Starting Animation after 1000ms
        setTimeout(() => {

            // Parallel Animation...
            Animated.parallel([
                Animated.timing(
                    this.startAnimation,
                    {
                        toValue: -Dimensions.get('window').height / 1.5,
                        useNativeDriver: true
                    }
                ),
                Animated.timing(
                    this.moveLogo,
                    {
                        // Moving to Top...
                        toValue: {
                            x: 0,
                            y: Dimensions.get('window').height / 3 + 50
                        },
                        useNativeDriver: true
                    }
                )
            ]).start();
        }, 1500);
    }

    render() {

        // Going ti Move up like a Navbar...
        return (
            <View style={styles.screen}>
                <Animated.View style={[{
                    translateY: this.startAnimation,
                }, styles.container]}>
                    <Animated.View style={styles.logo_box}>
                        <Animated.Image
                            style={[{
                                transform: [
                                    { translateY: this.moveLogo.y }
                                ]
                            }, styles.logo_img]}
                            source={Logo}
                        />
                    </Animated.View>
                </Animated.View>
                <Animated.View style={styles.content}>
                    <View
                        style={
                            {
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }
                        }>
                        <Login />
                    </View>
                </Animated.View>
            </View>
        );
    }
}

export default SplashScreen;

const styles = StyleSheet.create({

    // Animated logo...
    screen: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },

    container: {
        flex: 1,
        backgroundColor: BGColor,
        zIndex: 1
    },

    logo_box: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    logo_img: {
        width: 350,
        height: 150,
        resizeMode: 'stretch',
        marginBottom: 25
    },

    // Content
    content: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#5a57ab',
        zIndex: 0,
    }
});