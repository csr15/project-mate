import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

const MapPreview = (props) => {
  const [isMapReady, setIsMapReady] = useState(false);
  const { lat, lng, developers, title } = props.navigation.getParam("mapData");
  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        style={StyleSheet.absoluteFillObject}
        onMapReady={() => setIsMapReady(true)}
        initialRegion={{
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {isMapReady ? (
          <Marker
            key={123}
            coordinate={{
              latitude: lat,
              longitude: lng,
            }}
            title={title}
            description={`${developers} developers`}
          />
        ) : null}
      </MapView>
    </View>
  );
};

export default MapPreview;

const styles = StyleSheet.create({});
