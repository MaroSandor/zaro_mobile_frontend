import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import AsyncStorage, { useAsyncStorage } from '@react-native-async-storage/async-storage';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            token: null
        };
    };

    componentDidMount() {
        
    }

    onSubmit = async () => {
        const { email, password } = this.state;
        
        await AsyncStorage.setItem('token', email);

        if (email === 'kacsa' && password === 'kiskacsa') {
            console.log('teszt')
            this.props.navigation.navigate('Home')
        } else {
            console.log('teszt-rossz')
        }
    }

    tokenFunction = async () => {
        const value = await AsyncStorage.getItem('token');
        if (value !== null) {
            navigation.navigate('Home')
            console.log('Bejelentkezve vagy!');
        } else {
            console.log('Hiba történt a tokenFunction függvényben!');
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput onChangeText={(value) => this.setState({ email: value })} placeholder='Username' />
                <TextInput secureTextEntry onChangeText={(value) => this.setState({ password: value })} placeholder='Password' />
                <Button
                    onPress={this.onSubmit}
                    title='Login' />
                <Text>username: {this.state.email}</Text>
                <Text>password: {this.state.password}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
});