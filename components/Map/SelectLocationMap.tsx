import React, { useState, useCallback, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import {
  MapView,
  Camera,
  PointAnnotation,
  MarkerView,
} from "@maplibre/maplibre-react-native";
import * as Location from "expo-location";
import { useFocusEffect, useRouter } from "expo-router";

const MAP_STYLE = "https://tiles.openfreemap.org/styles/liberty";

type Coordinate = {
  latitude: number;
  longitude: number;
};

export default function SelectLocationMap() {
  const router = useRouter();
  const annotationRef = useRef<any>(null);

  const [selectedCoord, setSelectedCoord] = useState<Coordinate | null>(null);
  const [address, setAddress] = useState<string>("");
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);
  const [cameraCenter, setCameraCenter] = useState<[number, number]>([
    106.8272, -6.1751,
  ]);

  const reverseGeocode = async (coord: Coordinate): Promise<string> => {
    try {
      const { status } = await Location.getForegroundPermissionsAsync();
      if (status !== "granted") {
        await Location.requestForegroundPermissionsAsync();
      }

      const results = await Location.reverseGeocodeAsync({
        latitude: coord.latitude,
        longitude: coord.longitude,
      });

      if (!results || results.length === 0) return "Alamat tidak ditemukan";

      const loc = results[0];
      const parts = [
        loc.street,
        loc.district,
        loc.subregion,
        loc.city,
        loc.region,
        loc.country,
      ].filter(Boolean);

      return parts.length > 0 ? parts.join(", ") : "Alamat tidak ditemukan";
    } catch (error: any) {
      console.log("reverseGeocode error:", error?.message || error);
      return "Gagal mengambil alamat";
    }
  };

  const handleMapPress = useCallback(async (event: any) => {
    try {
      const coordinates = event?.geometry?.coordinates;
      if (!coordinates) return;

      const [longitude, latitude] = coordinates;
      if (!longitude || !latitude) return;

      const coord: Coordinate = { latitude, longitude };

      // ✅ Update state koordinat, BUKAN ganti key
      setSelectedCoord(coord);
      setCameraCenter([longitude, latitude]);
      setAddress("");
      setIsLoadingAddress(true);

      const resolvedAddress = await reverseGeocode(coord);
      setAddress(resolvedAddress);
      setIsLoadingAddress(false);

      // ✅ Refresh annotation tanpa unmount
      annotationRef.current?.refresh?.();
    } catch (error: any) {
      console.log("handleMapPress error:", error?.message || error);
      setIsLoadingAddress(false);
    }
  }, []);

  const handleConfirm = () => {
    if (!selectedCoord) return;
    router.navigate({
      pathname: "/maps/create",
      params: {
        latitude: String(selectedCoord.latitude),
        longitude: String(selectedCoord.longitude),
        address,
      },
    });
  };

  // Sembunyikan marker sebelum halaman unmount
  useFocusEffect(
    useCallback(() => {
      return () => {
        // Cleanup saat leave — sembunyikan marker dulu sebelum unmount
        setSelectedCoord(null);
      };
    }, []),
  );

  return (
    <View style={styles.container}>
      <MapView style={styles.map} mapStyle={MAP_STYLE} onPress={handleMapPress}>
        <Camera
          zoomLevel={14}
          centerCoordinate={cameraCenter}
          animationMode="flyTo"
          animationDuration={300}
        />

        {/* ✅ Key statis — tidak pernah berubah, tidak unmount/remount */}
        {selectedCoord && (
          <MarkerView
            id="selected-marker"
            coordinate={[selectedCoord.longitude, selectedCoord.latitude]}
            anchor={{ x: 0.5, y: 1 }} // Anchor bawah tengah
          >
            <View style={styles.pin}>
              <View style={styles.pinDot} />
            </View>
          </MarkerView>
        )}
      </MapView>

      {/* Bottom Sheet */}
      <View style={styles.bottomSheet}>
        {!selectedCoord ? (
          <Text style={styles.hintText}>
            Tap pada peta untuk memilih lokasi
          </Text>
        ) : (
          <>
            <View style={styles.coordRow}>
              <View style={styles.coordItem}>
                <Text style={styles.coordLabel}>Latitude</Text>
                <Text style={styles.coordValue}>
                  {selectedCoord.latitude.toFixed(6)}
                </Text>
              </View>
              <View style={styles.dividerVertical} />
              <View style={styles.coordItem}>
                <Text style={styles.coordLabel}>Longitude</Text>
                <Text style={styles.coordValue}>
                  {selectedCoord.longitude.toFixed(6)}
                </Text>
              </View>
            </View>

            <View style={styles.addressContainer}>
              <Text style={styles.coordLabel}>Alamat</Text>
              {isLoadingAddress ? (
                <ActivityIndicator size="small" color="#0a1f44" />
              ) : (
                <Text style={styles.addressText} numberOfLines={2}>
                  {address || "-"}
                </Text>
              )}
            </View>

            <TouchableOpacity
              style={[
                styles.confirmButton,
                isLoadingAddress && styles.confirmButtonDisabled,
              ]}
              onPress={handleConfirm}
              disabled={isLoadingAddress}
            >
              <Text style={styles.confirmButtonText}>Konfirmasi Lokasi</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  pin: {
    width: 28,
    height: 28,
    borderRadius: 100,
    backgroundColor: "#0a1f44",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
  pinDot: {
    width: 8,
    height: 8,
    borderRadius: 100,
    backgroundColor: "#fff",
  },
  bottomSheet: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingBottom: 32,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    minHeight: 140,
    justifyContent: "center",
  },
  hintText: {
    textAlign: "center",
    color: "#888",
    fontSize: 14,
  },
  coordRow: {
    flexDirection: "row",
    marginBottom: 12,
  },
  coordItem: { flex: 1 },
  dividerVertical: {
    width: 1,
    backgroundColor: "#e0e0e0",
    marginHorizontal: 12,
  },
  coordLabel: {
    fontSize: 11,
    color: "#888",
    marginBottom: 2,
  },
  coordValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0a1f44",
  },
  addressContainer: { marginBottom: 16 },
  addressText: {
    fontSize: 13,
    color: "#333",
    lineHeight: 18,
  },
  confirmButton: {
    backgroundColor: "#0a1f44",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  confirmButtonDisabled: {
    backgroundColor: "#aaa",
  },
  confirmButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
});
