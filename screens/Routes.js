import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Divider } from "react-native-paper";
import { Octicons } from 'react-native-vector-icons';

class RouteList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routes: [],
      ertek: false,
      size: 25
    };
  }

  getAdatTomb = async () => {
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

    if (this.state.routes == null || this.state.routes == "") {
      this.getAdatok()
    } else {
      console.log("A tömb feltöltve")
      console.log(this.state.routes)
    }
  }

  getAdatok = () => {
    fetch("http://nodejs.dszcbaross.edu.hu:24001/routes")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ routes: data });
      })
      .catch((error) => {
        console.error(error);
      });

    setTimeout(() => {
      this.setAdatokAsync();
    }, 100);
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
      this.getAdatTomb()
    })
  }

  componentWillUnmount() {
    this.navFocusListener();
  }

  render() {
    const { routes } = this.state;

    return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.tramTitle}>Villamos</Text>
          <View style={styles.tramView}>
            {routes
              .filter((route) => route.route_type === 0)
              .map((route) => (
                <View key={route.routes_id} style={styles.route}>
                  <View style={styles.content}>
                    <View style={styles.yellowMarker} />
                    <Divider />
                    <Text style={styles.shortName}>{route.route_short_name}</Text>
                    <Text style={styles.longName}>{route.route_long_name}</Text>
                    <Divider />
                  </View>
                  <View style={styles.button}>
                    <TouchableWithoutFeedback
                      id={route.routes_id}
                      style={styles.fav_btn}
                      onPress={() => this.kedvenc(route.routes_id)}>
                      {route.route_favorit == 'true'
                        ?
                        <Octicons name="heart-fill" color={'black'} size={this.state.size} />
                        :
                        <Octicons name="heart" color={'black'} size={this.state.size} />
                      }
                    </TouchableWithoutFeedback>
                  </View>
                </View>
              ))}
          </View>
          <Text style={styles.busTitle}>Busz</Text>
          <View style={styles.busView}>
            {routes
              .filter((route) => route.route_type === 3)
              .map((route) => (
                <View key={route.routes_id} style={styles.route}>
                  <View style={styles.content}>
                    <View style={styles.blueMarker} />
                    <Divider />
                    <Text style={styles.shortName}>{route.route_short_name}</Text>
                    <Text style={styles.longName}>{route.route_long_name}</Text>
                    <Divider />
                  </View>
                  <View style={styles.button}>
                    <TouchableWithoutFeedback
                      id={route.routes_id}
                      style={styles.fav_btn}
                      onPress={() => this.kedvenc(route.routes_id)}>
                      {route.route_favorit == 'true'
                        ?
                        <Octicons name="heart-fill" color={'black'} size={this.state.size} />
                        :
                        <Octicons name="heart" color={'black'} size={this.state.size} />
                      }
                    </TouchableWithoutFeedback>
                  </View>
                </View>
              ))}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#e8e8e8",
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
    paddingLeft: 20,
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
});

export default RouteList;