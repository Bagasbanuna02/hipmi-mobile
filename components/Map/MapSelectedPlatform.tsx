import { Platform } from "react-native";
import MapSelected from "./MapSelected";
import MapSelectedV2 from "./MapSelectedV2";
import { LatLng } from "react-native-maps";

/**
 * Props untuk komponen MapSelectedPlatform
 * Mendukung kedua format koordinat (LatLng untuk iOS, [number, number] untuk Android)
 */
export interface MapSelectedPlatformProps {
  /** Region awal kamera */
  initialRegion?: {
    latitude?: number;
    longitude?: number;
    latitudeDelta?: number;
    longitudeDelta?: number;
  };

  /** Lokasi yang dipilih (support kedua format) */
  selectedLocation: LatLng | [number, number] | null;

  /** Callback ketika lokasi dipilih */
  onLocationSelect: (location: LatLng | [number, number]) => void;

  /** Tinggi peta dalam pixels (default: 400) */
  height?: number;

  /** Tampilkan lokasi user (default: true) */
  showUserLocation?: boolean;

  /** Tampilkan tombol my location (default: true) */
  showsMyLocationButton?: boolean;
}

/**
 * Komponen Map yang otomatis memilih implementasi berdasarkan platform
 * 
 * Platform Strategy:
 * - **iOS**: Menggunakan react-native-maps (MapSelected)
 * - **Android**: Menggunakan @maplibre/maplibre-react-native (MapSelectedV2)
 * 
 * @example
 * ```tsx
 * <MapSelectedPlatform
 *   selectedLocation={selectedLocation}
 *   onLocationSelect={setSelectedLocation}
 *   height={300}
 * />
 * ```
 */
export function MapSelectedPlatform({
  initialRegion,
  selectedLocation,
  onLocationSelect,
  height = 400,
  showUserLocation = true,
  showsMyLocationButton = true,
}: MapSelectedPlatformProps) {
  // iOS: Gunakan react-native-maps
  // if (Platform.OS === "ios") {
  //   return (
  //     <MapSelected
  //       initialRegion={initialRegion}
  //       selectedLocation={(selectedLocation as LatLng) || { latitude: 0, longitude: 0 }}
  //       setSelectedLocation={(location: LatLng) => {
  //         onLocationSelect(location);
  //       }}
  //       height={height}
  //     />
  //   );
  // }

  // Android: Gunakan MapLibre
  // Konversi dari LatLng ke [longitude, latitude] jika perlu
  const androidLocation: [number, number] | undefined = selectedLocation
    ? isLatLng(selectedLocation)
      ? [selectedLocation.longitude, selectedLocation.latitude]
      : selectedLocation
    : undefined;

  return (
    <MapSelectedV2
      selectedLocation={androidLocation}
      onLocationSelect={(location: [number, number]) => {
        // Konversi dari [longitude, latitude] ke LatLng untuk konsistensi
        const latLng: LatLng = {
          latitude: location[1],
          longitude: location[0],
        };
        onLocationSelect(latLng);
      }}
      height={height}
      // showUserLocation={showUserLocation}
      // showsMyLocationButton={showsMyLocationButton}
    />
  );
}

/**
 * Type guard untuk mengecek apakah object adalah LatLng
 */
function isLatLng(location: any): location is LatLng {
  return (
    location &&
    typeof location.latitude === "number" &&
    typeof location.longitude === "number"
  );
}

export default MapSelectedPlatform;
