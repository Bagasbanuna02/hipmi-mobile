import React, { useCallback, useMemo, useRef } from "react";
import {
  StyleSheet,
  View,
  ViewStyle,
  StyleProp,
} from "react-native";
import { MainColor } from "@/constants/color-palet";
import {
  MapView,
  Camera,
  PointAnnotation,
} from "@maplibre/maplibre-react-native";

const DEFAULT_MAP_STYLE = "https://tiles.openfreemap.org/styles/liberty";

export interface Region {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

export interface MapSelectedV2Props {
  initialRegion?: Region;
  selectedLocation?: [number, number];
  onLocationSelect?: (location: [number, number]) => void;
  height?: number;
  style?: StyleProp<ViewStyle>;
  mapViewStyle?: StyleProp<ViewStyle>;
  showUserLocation?: boolean;
  showsMyLocationButton?: boolean;
  mapStyle?: string;
  zoomLevel?: number;
}

// ✅ Marker simple tanpa Animated — hapus pulse animation
function SelectedLocationMarker({
  color = MainColor.darkblue,
}: {
  size?: number;
  color?: string;
}) {
  return (
    <View style={styles.markerContainer}>
      <View style={[styles.markerRing, { borderColor: color }]} />
      <View style={[styles.markerDot, { backgroundColor: color }]} />
    </View>
  );
}

export function MapSelectedV2({
  initialRegion,
  selectedLocation,
  onLocationSelect,
  height = 400,
  style = styles.container,
  mapViewStyle = styles.map,
  mapStyle,
  zoomLevel = 12,
}: MapSelectedV2Props) {
  const defaultRegion = useMemo(
    () => ({
      latitude: -8.737109,
      longitude: 115.1756897,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
    }),
    [],
  );

  const region = initialRegion || defaultRegion;

  // ✅ Simpan initial center — TIDAK berubah saat user tap
  const initialCenter = useRef<[number, number]>([
    region.longitude,
    region.latitude,
  ]);

  const handleMapPress = useCallback(
    (event: any) => {
      const coordinate = event?.geometry?.coordinates || event?.coordinates;
      if (coordinate && Array.isArray(coordinate) && coordinate.length === 2) {
        console.log("[MapSelectedV2] coordinate", coordinate);
        onLocationSelect?.([coordinate[0], coordinate[1]]);
      }
    },
    [onLocationSelect],
  );

  return (
    <View style={[style, { height }]} collapsable={false}>
      <MapView
        style={mapViewStyle}
        mapStyle={mapStyle || DEFAULT_MAP_STYLE}
        onPress={handleMapPress}
        logoEnabled={false}
        compassEnabled={true}
        compassViewPosition={2}
        compassViewMargins={{ x: 10, y: 10 }}
        scrollEnabled={true}
        zoomEnabled={true}
        rotateEnabled={true}
        pitchEnabled={false}
      >
        {/* ✅ Camera hanya set sekali di awal, tidak reactive ke selectedLocation */}
        <Camera
          defaultSettings={{
            centerCoordinate: initialCenter.current,
            zoomLevel: zoomLevel,
          }}
        />

        {/* ✅ Hanya render PointAnnotation jika ada selectedLocation */}
        {/* ✅ Key statis — tidak pernah unmount/remount */}
        {selectedLocation && (
          <PointAnnotation
            id="selected-location"
            key="selected-location"
            coordinate={selectedLocation}
          >
            <SelectedLocationMarker />
          </PointAnnotation>
        )}
      </MapView>
    </View>
  );
}

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
  markerContainer: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  // ✅ Ring statis pengganti pulse animation
  markerRing: {
    position: "absolute",
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    opacity: 0.4,
  },
  markerDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
});

export default MapSelectedV2;