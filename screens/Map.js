import React, {useState} from 'react';
import { View, StyleSheet} from 'react-native';
import AppTitle from '../components/Title';
import DrawerHeader from '../components/Drawer_header';
import MapView, {Marker} from 'react-native-maps';

const MapScreen = props => {
  const [marker, setMarker] = useState(null)
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0,
    longitudeDelta: 0.0,
  })
  return (
    <MapView
    //   ref={data}
    // provider={PROVIDER_GOOGLE} // remove if not using Google Maps
    style={styles.map}
    zoomEnabled={true}
    minZoomLevel={2}
    scrollEnabled={true}
    showsScale={true}
    zoomControlEnabled={true}
    zoomTapEnabled={true}
    mapType={'satellite'}
    rotateEnabled={false}
    showsUserLocation={true}
    userLocationUpdateInterval={5000}
    showsMyLocationButton={true}
    loadingEnabled={true}
    showsCompass={true}
    onPress={(e) => setMarker(e.nativeEvent.coordinate)}
  >
{marker!=null?
    <Marker
      draggable
      coordinate={marker}
      onPress={()=> setMarker(null)}

    />:null}
</MapView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    width: '80%',
    justifyContent: 'center',
    alignContent: 'center',
  },
  text: {
    fontSize: 13,
    textAlign: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default MapScreen;