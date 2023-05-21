import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {useSharedValue} from "react-native-reanimated";
import BottomSheet from "./BottomSheet";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {WEATHER_API_ENDPOINT} from '@env'

const MapScreen = () => {
    const [marker, setMarker] = useState(null)
    const y = useSharedValue(0);
    const [caption, setCaption] = useState("Select location")
    let [coordinate, setCoordinate] = useState(null)
    let [temperature, setTemperature] = useState("25")
    let [iconCode, setIconCode] = useState("01d")

    const getWeather = () => {
        fetch(WEATHER_API_ENDPOINT, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                longitude: coordinate.longitude,
                latitude: coordinate.latitude,
                units: "metric"
            })
        })
            .then(res => res.json())
            .then(obj => {
                    setTemperature(Math.round(parseFloat(obj.temperature.toString())));
                    setIconCode(obj.icon.toString());
                }
            )
            .catch(error => {
                console.error("Error: " + error);
            });
    };


    return (<GestureHandlerRootView>
        <MapView
            //   ref={data}
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={styles.map}
            zoomEnabled={true}
            minZoomLevel={2}
            scrollEnabled={true}
            showsScale={true}
            zoomControlEnabled={true}
            zoomTapEnabled={true}
            mapType={'standard'}
            rotateEnabled={false}
            showsUserLocation={true}
            userLocationUpdateInterval={5000}
            showsMyLocationButton={true}
            loadingEnabled={true}
            showsCompass={true}
            onPoiClick={(e) => {
                coordinate = e.nativeEvent.coordinate;
                setCoordinate(e.nativeEvent.coordinate);
                if (coordinate != null) {
                    getWeather();
                }
                setMarker(e.nativeEvent.coordinate);
                setCaption(e.nativeEvent.name.replace(/(\r\n|\n|\r)/gm, " "));
            }}
            onPress={(e) => {
                coordinate = e.nativeEvent.coordinate;
                setCoordinate(e.nativeEvent.coordinate);
                if (coordinate != null) {
                    getWeather();
                }
                setCaption("Dropped pin");
                setMarker(e.nativeEvent.coordinate);
            }}
        >
            {marker != null ? <Marker
                coordinate={marker}
                onPress={() => null}

            /> : null}
        </MapView>
        <BottomSheet panY={y} panCaption={caption} coordinate={coordinate} temperature={temperature}
                     iconCode={iconCode}/>
    </GestureHandlerRootView>);
};

const styles = StyleSheet.create({
    main: {
        flex: 1, width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center',
    }, textContainer: {
        width: '80%', justifyContent: 'center', alignContent: 'center',
    }, text: {
        fontSize: 13, textAlign: 'center',
    }, map: {
        width: '100%', height: '100%',
    },
});

export default MapScreen;