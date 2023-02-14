import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            token: null
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput onChangeText={(value) => this.setState({ username: value })} placeholder='Username' />
                <TextInput secureTextEntry onChangeText={(value) => this.setState({ password: value })} placeholder='Password' />
                <Button title='Login' />
                <Text>username: {this.state.username}</Text>
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