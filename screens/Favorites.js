import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons, Ionicons, Octicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Divider } from 'react-native-paper';

import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

export default class Favorit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            routes: [],
            size: 25
        }
    }

    getAdatok = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('tomb');
            if (jsonValue == null) {
                fetch("http://nodejs.dszcbaross.edu.hu:24001/routes")
                    .then((response) => response.json())
                    .then((data) => {
                        this.setState({ routes: data });
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            } else {
                this.setState({ routes: JSON.parse(jsonValue) })
            }
            
        } catch (e) {
            console.log('Error retrieving data:', e);
        }
    }

    setAdatokAsync = async () => {
        try {
            const jsonValue = JSON.stringify(this.state.routes);
            await AsyncStorage.setItem('tomb', jsonValue);
        } catch (e) {
            console.log('Error saving data:', e);
        }
    };

    kedvenc = (id) => {
        const newData = this.state.routes.map(elem => {
            if (elem.routes_id === id) {
                if (elem.route_favorit == 'true') {
                    return { ...elem, route_favorit: 'false' };
                } else {
                    return { ...elem, route_favorit: 'true' };
                }
            }
            return elem;
        });
        this.setState({ routes: newData });
        setTimeout(() => {
            this.setAdatokAsync();
        }, 1000);
    }

    componentDidMount() {
        this.navFocusListener = this.props.navigation.addListener('focus', () => {
            this.getAdatok();
            setTimeout(() => {
                console.log(this.state.routes);
            }, 1000);
        })
    }

    componentWillUnmount() {
        this.navFocusListener();
    }

    render() {
        const { routes } = this.state;

        return (

            <View style={styles.container}>

                {routes
                    .filter((route) => route.route_favorit == 'true')
                    .map((route) => (
                        <View key={route.routes_id} style={styles.route}>
                            <View style={styles.content}>
                                <Text style={styles.shortName}>{route.route_short_name}</Text>
                                <Text style={styles.longName}>{route.route_long_name}</Text>
                            </View>
                            <View style={styles.button}>
                                <TouchableWithoutFeedback
                                    id={route.routes_id}
                                    style={styles.fav_btn}
                                    onPress={() => this.kedvenc(route.routes_id)}>
                                    {route.route_favorit == 'true'
                                        ?
                                        <Octicons name="trash" color={'black'} size={this.state.size} />
                                        :
                                        <Octicons name="trash" color={'black'} size={this.state.size} />
                                    }
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                    ))}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
    },
    tramTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 15,
    },
    busTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 15,
        marginTop: 25,
    },
    shortName: {
        fontSize: 14,
        fontWeight: "bold",
        marginBottom: 5,
        marginTop: 5,
    },
    tramView: {
        backgroundColor: "white",
        padding: 5,
    },
    busView: {
        backgroundColor: "white",
        padding: 5,
    },
    route: {
        flexDirection: 'row',
        padding: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#000'
    },
    content: {
        flex: 6
    },
    button: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    yellowMarker: {
        position: "absolute",
        backgroundColor: "#cfc64c",
        width: 20,
        height: "100%",
        top: 0,
        left: -23,
    },
    blueMarker: {
        position: "absolute",
        backgroundColor: "#4ca5cf",
        width: 20,
        height: "100%",
        top: 0,
        left: -23,
    },
    separator: {
        marginBottom: 5,
        marginTop: 5,
        position: "relative",
        width: 350,
        height: 1,
        backgroundColor: "#cccccc",
        left: -18,
    },
})