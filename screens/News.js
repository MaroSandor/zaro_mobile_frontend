import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Divider } from '@rneui/themed';

export default class News extends Component {
    constructor(props) {
        super(props)
        this.state = {
            news: [],
            date: []
        }
    }

    getNews = async () => {
        try {
            const response = await fetch("http://nodejs.dszcbaross.edu.hu:24001/hirek");
            const json = await response.json();
            this.setState({ news: json });
        } catch (error) {
            console.log("A 'getNews' függvényben hiba történt: " + error);
        } finally {
            console.log('A lekérés megtörtént!')
        }
    }

    componentDidMount() {
        this.navFocusListener = this.props.navigation.addListener('focus', () => {
            this.getNews()
        })
    }

    componentWillUnmount() {
        this.navFocusListener();
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    {this.state.news.map((elem) =>
                        <View key={elem.news_id}>
                            <View style={styles.card}>
                                <View style={styles.box}>
                                    <Text style={styles.boxTitle}>{elem.news_title}</Text>
                                    <Text style={{ fontWeight: "bold", fontSize: 15 }}>{elem.news_description}</Text>
                                    <Text style={styles.boxDate}>{elem.news_date}</Text>
                                </View>
                            </View>
                            <Divider width={3} inset={true} color={'darkgray'} insetType="middle" />
                        </View>
                    )}
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },

    card: {
        alignSelf: 'center',
        width: '90%',
        margin: 10,
        backgroundColor: "white",
        borderRadius: 15,
        elevation: 15,
        padding: 10
    },

    boxTitle: {
        borderRadius: 50,
        marginBottom: 10,
        fontWeight: 'bold',
        fontSize: 18,
        color: 'red',
    },

    boxDate: {
        marginTop: 10,
        color: 'grey',
        textAlign: 'right'
    },

    header: {
        flexDirection: "column",
    }

    // container: {
    //     flex: 1,
    //     justifyContent: 'center',
    //     backgroundColor: '#ecf0f1',
    //     padding: 10,
    //     alignItems: "center"
    // },

    // contentBox: {
    //     flexDirection: 'column',
    //     borderWidth: 1,
    //     elevation: 5
    // },

    // contentBox: {
    //     flexDirection: 'column',
    //     margin: 10,
    //     borderWidth: 1,
    //     borderColor: 'black',
    //     borderRadius: 15,
    //     elevation: 5
    // },

    // contentBoxTitle: {
    //     flex: 2,
    //     padding: 15,
    //     borderTopRightRadius: 20,
    //     borderTopLeftRadius: 20
    // },

    // contentBoxTitle_TEXT: {
    //     color: 'red'
    // },

    // contentBoxDescription: {
    //     flex: 6,
    //     padding: 12
    // },

    // contentBoxDescription_TEXT: {
    //     color: 'black',
    // },

    // contentBoxDate: {
    //     flex: 1,
    //     padding: 15,
    //     borderBottomRightRadius: 20,
    //     borderBottomLeftRadius: 20,
    //     alignItems: 'flex-end'
    // },

    // contentBoxDate_TEXT: {
    //     color: 'darkblue'
    // }
})