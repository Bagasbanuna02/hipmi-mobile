// components/MapComponent.js

import React from "react";
import { DimensionValue, StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

interface MapComponentProps {
  latitude?: number;
  longitude?: number;
  latitudeDelta?: number;
  longitudeDelta?: number;
  height?: DimensionValue;
}

const MapCustom = ({
  latitude = -8.737109,
  longitude = 115.1756897,
  latitudeDelta = 0.1,
  longitudeDelta = 0.1,
  height = 300,
}: MapComponentProps) => {
  const initialRegion = {
    latitude,
    longitude, // Jakarta sebagai default lokasi
    latitudeDelta,
    longitudeDelta,
  };

  return (
    <View style={styles.container}>
      <MapView
        style={[styles.map, { height }]}
        initialRegion={initialRegion}
        showsUserLocation={true}
        loadingEnabled={true}
      >
        {/* Contoh marker */}
        <Marker
          coordinate={{
            latitude,
            longitude,
          }}
          title="Bali"
          description="Badung, Bali, Indonesia"
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 8,
  },
  map: {
    width: "100%",
  },
});

export default MapCustom;
