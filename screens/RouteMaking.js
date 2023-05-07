import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";
import MapView, { Polyline } from "react-native-maps";

export default function App() {
    const [startPoint, setStartPoint] = useState("");
    const [endPoint, setEndPoint] = useState("");
    const [routeCoordinates, setRouteCoordinates] = useState([]);

    const handlePlanRoute = () => {
        fetch(
            `https://maps.googleapis.com/maps/api/directions/json?origin=${startPoint}&destination=${endPoint}&key=AIzaSyDubk0CZFG76uYtCnT0-UecLfBU24J9lDU`
        )
            .then((response) => response.json())
            .then((data) => {
                const route = data.routes[0];
                const points = route.overview_polyline.points;
                const coords = points ? decodePolyline(points) : [];
                setRouteCoordinates(coords);
            })
            .catch((error) => console.log(error));
    };

    const decodePolyline = (encoded) => {
        const poly = [];
        let index = 0,
            len = encoded.length;
        let lat = 0,
            lng = 0;

        while (index < len) {
            let b,
                shift = 0,
                result = 0;
            do {
                b = encoded.charAt(index++).charCodeAt(0) - 63;
                result |= (b & 0x1f) << shift;
                shift += 5;
            } while (b >= 0x20);

            const deltaLat = (result & 1) === 1 ? ~(result >> 1) : result >> 1;
            lat += deltaLat;

            shift = 0;
            result = 0;

            do {
                b = encoded.charAt(index++).charCodeAt(0) - 63;
                result |= (b & 0x1f) << shift;
                shift += 5;
            } while (b >= 0x20);

            const deltaLng = (result & 1) === 1 ? ~(result >> 1) : result >> 1;
            lng += deltaLng;

            poly.push({ latitude: lat / 1e5, longitude: lng / 1e5 });
        }

        return poly;
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={{ padding: 20 }}>
                <TextInput
                    placeholder="Indulási hely"
                    value={startPoint}
                    onChangeText={setStartPoint}
                    style={{ marginBottom: 10 }}
                />
                <TextInput
                    placeholder="Érkezési hely"
                    value={endPoint}
                    onChangeText={setEndPoint}
                    style={{ marginBottom: 10 }}
                />
                <Button title="Útvonal tervezése" onPress={handlePlanRoute} />
            </View>
            {routeCoordinates.length > 0 && (
                <MapView style={{ flex: 1 }}>
                    <Polyline
                        coordinates={routeCoordinates}
                        strokeColor="#000"
                        strokeWidth={6}
                    />
                </MapView>
            )}
        </View>
    );
}