import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {useSharedValue} from "react-native-reanimated";
import BottomSheet from "./BottomSheet";
import {GestureHandlerRootView} from "react-native-gesture-handler";

const MapScreen = props => {
    const [marker, setMarker] = useState(null)
    const y = useSharedValue(0);
    const [caption, setCaption] = useState("Select location")
    const [coordinate, setCoordinate] = useState(null)

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
                setMarker(e.nativeEvent.coordinate);
                setCaption(e.nativeEvent.name.replace(/(\r\n|\n|\r)/gm, " "));
                setCoordinate(e.nativeEvent.coordinate);
            }}
            onPress={(e) => {
                setMarker(e.nativeEvent.coordinate);
                setCoordinate(e.nativeEvent.coordinate);
                setCaption("Dropped pin");
            }}
        >
            {marker != null ? <Marker
                coordinate={marker}
                onPress={() => null}

            /> : null}
        </MapView>
        <BottomSheet panY={y} panCaption={caption} coordinate={coordinate}/>
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