import React from "react";
import { StyleSheet, View } from "react-native";

// Cek versi >= 10.x gunakan ini
import { MapView, Camera, PointAnnotation } from "@maplibre/maplibre-react-native";

const MAP_STYLE = "https://tiles.openfreemap.org/styles/liberty";


export default function MapsView2() {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        mapStyle={MAP_STYLE}
      >
        <Camera
          zoomLevel={12}
          centerCoordinate={[115.1756897, -8.737109]}
        />

        <PointAnnotation
          id="marker-1"
          coordinate={[115.1756897, -8.737109]}
        >
          <View style={styles.marker} />
        </PointAnnotation>
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  marker: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "red",
  },
});