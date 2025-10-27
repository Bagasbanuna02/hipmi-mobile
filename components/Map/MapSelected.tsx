import React from "react";
import { StyleSheet, View } from "react-native";
import MapView, { LatLng, Marker } from "react-native-maps";

interface MapSelectedProps {
  initialRegion?: {
    latitude?: number;
    longitude?: number;
    latitudeDelta?: number;
    longitudeDelta?: number;
  };
  onLocationSelect?: (location: LatLng) => void;
  height?: number; // Opsional: tinggi peta dalam piksel
  selectedLocation: LatLng;
  setSelectedLocation: (location: LatLng) => void;
}

const MapSelected: React.FC<MapSelectedProps> = ({
  initialRegion,
  onLocationSelect,
  selectedLocation,
  setSelectedLocation,
  height = 400, // Default height: 400
}) => {
  const handleMapPress = (event: any) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    const location = { latitude, longitude };
    setSelectedLocation(location);
    onLocationSelect?.(location);
  };

  // Default region sesuai permintaan
  const defaultRegion = {
    latitude: -8.737109,
    longitude: 115.1756897,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  };

  return (
    <View style={[styles.container, { height }]}>
      <MapView
        style={styles.map}
        initialRegion={(initialRegion as any) || defaultRegion}
        onPress={handleMapPress}
        showsUserLocation={true}
        showsMyLocationButton={true}
        loadingEnabled={true}
        loadingIndicatorColor="#666"
        loadingBackgroundColor="#f0f0f0"
      >
        {selectedLocation && (
          <Marker
            coordinate={selectedLocation}
            title="Lokasi Dipilih"
            description={`Lat: ${selectedLocation.latitude.toFixed(
              6
            )}, Lng: ${selectedLocation.longitude.toFixed(6)}`}
            pinColor="red"
          />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#f5f5f5",
    overflow: "hidden",
    borderRadius: 8,
  },
  map: {
    flex: 1,
  },
});

export default MapSelected;
