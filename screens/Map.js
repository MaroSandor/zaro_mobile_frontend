import React, { Component } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";

export default class MapScreen extends Component {
  state = {
    location: null,
    markers: [],
    errorMsg: null,
  };

  async componentDidMount() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      this.setState({
        errorMsg: "A helyzetedhez való hozzáférés megtagadva!",
      });
    } else {
      this.setState({ errorMsg: null });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });

    // Adatok lekérése a szerverről
    fetch("http://nodejs.dszcbaross.edu.hu:24001/stops")
      .then((response) => response.json())
      .then((data) => {
        let markers = data.map((item) => ({
          title: item.stop_id.toString(),
          description: item.stop_name,
          coordinates: {
            latitude: parseFloat(item.stop_lat),
            longitude: parseFloat(item.stop_lon),
          },
        }));
        this.setState({ markers });
      })
      .catch((error) => console.log(error));
  }

  render() {
    const { location, markers, errorMsg } = this.state;

    if (errorMsg) {
      return (
        <View style={styles.container}>
          <Text>{errorMsg}</Text>
        </View>
      );
    } else if (!location) {
      return (
        <View style={styles.container}>
          <Text>Betöltés...</Text>
        </View>
      );
    } else {
      return (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 48.10328638326254,
            longitude: 20.77599317006489,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {markers.map((marker, index) => (
            <Marker
              key={marker.title}
              coordinate={marker.coordinates}
              title={marker.title}
              description={marker.description}
              image={require('../assets/bus-icon-50x50.png')}
              style={{ width: 20, resizeMode: 'contain' }}
            />
          ))}
        </MapView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});