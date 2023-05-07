import React, { Component, useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import {
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch,
    Divider
} from 'react-native-paper'

import {
    Feather,
    FontAwesome,
    FontAwesome5,
    Ionicons
} from 'react-native-vector-icons';

import Hirek from '../screens/News';
import Kedvencek from '../screens/Favorites';
import Jaratok from '../screens/Routes';
import Tervezo from '../screens/RouteMaking';
import Terkep from '../screens/Map';
import Beallitasok from '../screens/Settings';

export function DrawerContent(props) {
    return (
        <View style={{
            flex: 1,
            backgroundColor: '#14181b'
        }}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                    <View style={{ justifyContent: 'center' }}>
                        <Image source={require('../assets/welcome-logo_transparent.png')} style={{ width: '90%', resizeMode: 'contain'}} />
                    </View>
                    </View>
                    <Drawer.Section style={styles.drawerSection}>
                        <Divider style={{ width: '90%', alignSelf: 'center' }} />
                        <DrawerItem
                            icon={(color, size) => (
                                <FontAwesome name="heart"
                                    color={'white'}
                                    size={20}
                                />
                            )}
                            label="Kedvencek"
                            labelStyle={{ color: 'white' }}
                            onPress={() => { props.navigation.navigate('Kedvencek') }}
                        />
                        <DrawerItem
                            icon={(color, size) => (
                                <Ionicons name="bus-outline"
                                    color={'white'}
                                    size={20}
                                />
                            )}
                            label="Járatok"
                            labelStyle={{ color: 'white' }}
                            onPress={() => { props.navigation.navigate('Járatok') }}
                        />
                        <DrawerItem
                            icon={(color, size) => (
                                <Ionicons name="newspaper-outline"
                                    color={'white'}
                                    size={20}
                                />
                            )}
                            label="Hírek"
                            labelStyle={{ color: 'white' }}
                            onPress={() => { props.navigation.navigate('Hírek') }}
                        />
                        <DrawerItem
                            icon={(color, size) => (
                                <FontAwesome5 name="route"
                                    color={'white'}
                                    size={20}
                                />
                            )}
                            label="Útvonaltervező"
                            labelStyle={{ color: 'white' }}
                            onPress={() => { props.navigation.navigate('Útvonaltervező') }}
                        />
                        <DrawerItem
                            icon={(color, size) => (
                                <Feather name="map"
                                    color={'white'}
                                    size={20}
                                />
                            )}
                            label="Térkép"
                            labelStyle={{ color: 'white' }}
                            onPress={() => { props.navigation.navigate('Térkép') }}
                        />
                        <DrawerItem
                            icon={(color, size) => (
                                <Feather name="settings"
                                    color={'white'}
                                    size={20}
                                />
                            )}
                            label="Beállítások"
                            labelStyle={{ color: 'white' }}
                            onPress={() => { props.navigation.navigate('Beállítások') }}
                        />
                    </Drawer.Section>
                    {/* <Drawer.Section>
                        <TouchableRipple onPress={() => { changeTheme() }}>
                            <View style={styles.preference}>
                                <Text style={{ color: 'white', alignSelf: 'center', marginLeft: 20 }}>Sötét mód</Text>
                                <View pointerEvents='none'>
                                    <Switch style={{ marginRight: 20 }} value={isDarkTheme} />
                                </View>
                            </View>
                        </TouchableRipple>
                    </Drawer.Section> */}
                </View>
            </DrawerContentScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1
    },

    userInfoSection: {
        paddingLeft: 20
    },

    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
        color: 'white'
    },

    caption: {
        fontSize: 14,
        lineHeight: 14,
        color: 'white'
    },

    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },

    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15
    },

    paragraph: {
        fontWeight: 'bold',
        marginRight: 3
    },

    drawerSection: {
        marginTop: 15
    },

    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },

    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
        color: 'white'
    },

    signout: {
        marginBottom: 10,
        borderWidth: 1,
        borderColor: 'lightgray',
    }
})