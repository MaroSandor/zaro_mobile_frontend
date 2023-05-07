import React, { Component } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";
import { MaterialIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

class SettingsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notificationsEnabled: true,
      darkModeEnabled: true,
      language: "hu",
      unitOfMeasurement: "km",
    };
  }

  handleNotificationsToggle = () => {
    this.setState((previousState) => ({
      notificationsEnabled: !previousState.notificationsEnabled,
    }));
  };

  handleDarkModeToggle = () => {
    this.setState((previousState) => ({
      darkModeEnabled: !previousState.darkModeEnabled,
    }));
  };

  handleLanguageChange = (value) => {
    this.setState({ language: value });
  };

  handleUnitOfMeasurementChange = (value) => {
    this.setState({ unitOfMeasurement: value });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.settingItem}>
          <Text style={styles.notificationTitle}>Értesítések</Text>
          <Switch
            style={styles.notificationSwitch}
            value={this.state.notificationsEnabled}
            onValueChange={this.handleNotificationsToggle}
          />
        </View>

        <View style={styles.settingItem}>
          <Text style={styles.languageText}>Nyelv</Text>
          <Picker
            style={styles.languagePicker}
            selectedValue={this.state.language}
            onValueChange={this.handleLanguageChange}
          >
            <Picker.Item label="Magyar" value="hu" />
            <Picker.Item label="Angol" value="en" />
            <Picker.Item label="Német" value="de" />
          </Picker>
        </View>
        <View style={styles.settingItem}>
          <Text style={styles.unitText}>Mértékegység</Text>
          <Picker
            style={styles.unitPicker}
            selectedValue={this.state.unitOfMeasurement}
            onValueChange={this.handleUnitOfMeasurementChange}
          >
            <Picker.Item label="Kilométer" value="km" />
            <Picker.Item label="Mérföld" value="mi" />
          </Picker>
        </View>
        <View>
          <Text style={styles.darkModeTitle}>Sötét mód</Text>
          <Switch
            style={styles.darkModeSwitch}
            value={this.state.darkModeEnabled}
            onValueChange={this.handleDarkModeToggle}
          />
        </View>
      </View>
    );
  }
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
    marginVertical: 20,
  },
  notificationTitle: {
    marginLeft: "auto",
    marginRight: "auto",
    top: -100,
    fontSize: 18,
    fontWeight: "bold",
  },
  notificationSwitch: {
    marginLeft: "auto",
    marginRight: "auto",
    top: -90,
  },
  languageText: {
    marginLeft: "auto",
    marginRight: "auto",
    top: -60,
    fontSize: 18,
    fontWeight: "bold",
  },
  languagePicker: {
    width: 200,
    top: -80,
  },
  unitText: {
    marginLeft: "auto",
    marginRight: "auto",
    top: -60,
    fontSize: 18,
    fontWeight: "bold",
  },
  unitPicker: {
    width: 200,
    top: -115,
  },
  darkModeTitle: {
    marginLeft: "auto",
    marginRight: "auto",
    top: -120,
    fontSize: 18,
    fontWeight: "bold",
  },
  darkModeSwitch: {
    marginLeft: "auto",
    marginRight: "auto",
    top: -100,
  },
});
export default SettingsScreen;