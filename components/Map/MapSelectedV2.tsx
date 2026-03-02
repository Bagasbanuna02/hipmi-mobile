import React, { useCallback, useRef, useEffect, useState } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import {
  MapView,
  Camera,
  PointAnnotation,
} from "@maplibre/maplibre-react-native";
import * as Location from "expo-location";

const MAP_STYLE = "https://tiles.openfreemap.org/styles/liberty";
const DEBOUNCE_MS = 800;

interface Props {
  selectedLocation?: [number, number];
  onLocationSelect?: (location: [number, number]) => void;
  height?: number;
}

export function MapSelectedV2({
  selectedLocation,
  onLocationSelect,
  height = 400,
}: Props) {
  const lastTapRef = useRef<number>(0);
  const cameraRef = useRef<any>(null);

  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null,
  );
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);

  // ✅ Ambil lokasi user saat pertama mount
  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("Permission lokasi ditolak");
          setIsLoadingLocation(false);
          return;
        }

        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });

        const coords: [number, number] = [
          location.coords.longitude,
          location.coords.latitude,
        ];

        setUserLocation(coords);

        // ✅ Fly ke posisi user jika belum ada selectedLocation
        if (!selectedLocation && cameraRef.current) {
          cameraRef.current.flyTo(coords, 1000);
        }
      } catch (error) {
        console.log("Gagal ambil lokasi:", error);
      } finally {
        setIsLoadingLocation(false);
      }
    })();
  }, [isLoadingLocation]);

  const handleMapPress = useCallback(
    (event: any) => {
      const now = Date.now();
      if (now - lastTapRef.current < DEBOUNCE_MS) return;
      lastTapRef.current = now;

      const coords = event?.geometry?.coordinates;
      if (!coords || coords.length < 2) return;

      onLocationSelect?.([coords[0], coords[1]]);
    },
    [onLocationSelect],
  );

  // Center awal kamera:
  // 1. Jika ada selectedLocation → pakai itu
  // 2. Jika ada userLocation → pakai itu
  // 3. Fallback → Bali
  const initialCenter: [number, number] = selectedLocation ??
    userLocation ?? [115.1756897, -8.737109];

  return (
    <View style={{ height, width: "100%" }}>
      {/* Loading indicator saat fetch lokasi */}
      {isLoadingLocation && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="small" color="#0a1f44" />
        </View>
      )}

      <MapView
        style={StyleSheet.absoluteFillObject}
        mapStyle={MAP_STYLE}
        onPress={handleMapPress}
        logoEnabled={false}
      >
        <Camera
          ref={cameraRef}
          defaultSettings={{
            centerCoordinate: initialCenter,
            zoomLevel: 14,
          }}
        />

        {selectedLocation && (
          <PointAnnotation
            id="selected-location"
            key="selected-location"
            coordinate={selectedLocation}
          >
            <View style={styles.dot} />
          </PointAnnotation>
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  dot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#0a1f44",
    borderWidth: 2,
    borderColor: "#fff",
  },
  loadingOverlay: {
    position: "absolute",
    top: 10,
    alignSelf: "center",
    zIndex: 10,
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
});

export default MapSelectedV2;
