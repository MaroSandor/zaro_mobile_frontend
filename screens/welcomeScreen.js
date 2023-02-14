import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: ''
    }
  };

  logout = async () => {
    await AsyncStorage.removeItem('token')
    console.log('Logout')
    this.props.navigation.navigate('Login')
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar style='auto' />
        <Text>Bejelentkeztél!</Text>
        <Text>Bejelentkeztél!</Text>
        <Text>Bejelentkeztél!</Text>
        <Text>Bejelentkeztél!</Text>
        <Text>Bejelentkeztél!</Text>
        <Text>Bejelentkeztél!</Text>
        <Button onPress={this.logout} title='Logout' />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})