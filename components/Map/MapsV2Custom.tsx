import { ReactNode, useCallback, useMemo, useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  View,
  ViewStyle,
  StyleProp,
  Animated,
  Easing,
} from "react-native";

import API_IMAGE from "@/constants/api-storage";
import { MainColor } from "@/constants/color-palet";
import {
  Camera,
  MapView,
  PointAnnotation,
} from "@maplibre/maplibre-react-native";

// Style peta default
const DEFAULT_MAP_STYLE = "https://tiles.openfreemap.org/styles/liberty";

// Region default (Bali, Indonesia)
const DEFAULT_REGION = {
  latitude: -8.737109,
  longitude: 115.1756897,
  latitudeDelta: 0.1,
  longitudeDelta: 0.1,
};

// Zoom level default
const DEFAULT_ZOOM_LEVEL = 12;

// Ukuran marker default
const DEFAULT_MARKER_SIZE = 30;

/**
 * Interface data marker untuk MapsV2Custom
 */
export interface MapMarker {
  id: string;
  coordinate: [number, number]; // [longitude, latitude]
  imageId?: string;
  imageUrl?: string;
  onSelected?: () => void;
  [key: string]: any; // Izinkan properti custom tambahan
}

/**
 * Interface region untuk positioning kamera
 */
export interface Region {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

/**
 * Props untuk komponen MapsV2Custom
 */
export interface MapsV2CustomProps {
  /** URL style peta custom (default: liberty style) */
  mapStyle?: string;

  /** Override style container */
  style?: StyleProp<ViewStyle>;

  /** Override style MapView */
  mapViewStyle?: StyleProp<ViewStyle>;

  /** Region awal kamera */
  initialRegion?: Region;

  /** Zoom level awal (default: 12) */
  zoomLevel?: number;

  /**
   * Data marker - mendukung single marker atau array of markers
   * @example
   * // Single marker
   * markers={{ id: "1", coordinate: [115.175, -8.737], imageId: "abc" }}
   *
   * @example
   * // Multiple markers
   * markers={[
   *   { id: "1", coordinate: [115.175, -8.737], imageId: "abc" },
   *   { id: "2", coordinate: [115.180, -8.740], imageId: "xyz" }
   * ]}
   */
  markers?: MapMarker | MapMarker[];

  /** Custom renderer marker */
  renderMarker?: (marker: MapMarker) => ReactNode;

  /** Callback ketika marker ditekan */
  onMarkerPress?: (marker: MapMarker) => void;

  /** Gunakan style marker image default (default: true jika markers disediakan) */
  showDefaultMarkers?: boolean;

  /** Ukuran untuk marker default (default: 30) */
  markerSize?: number;

  /** Warna border untuk marker default */
  markerBorderColor?: string;

  /** Children tambahan untuk MapView (custom overlays, dll.) */
  children?: ReactNode;

  /** Handler untuk tekan pada peta */
  onMapPress?: (coordinates: [number, number]) => void;

  /** Test identifier */
  testID?: string;

  /** Props tambahan untuk Camera */
  cameraProps?: Partial<Omit<React.ComponentProps<typeof Camera>, "centerCoordinate" | "zoomLevel">>;

  /** Props tambahan untuk MapView */
  mapViewProps?: Partial<React.ComponentProps<typeof MapView>>;

  /** Props tambahan untuk PointAnnotation */
  annotationProps?: Partial<{
    id: string;
    title?: string;
    snippet?: string;
    selected?: boolean;
    draggable?: boolean;
    coordinate: number[];
    anchor?: { x: number; y: number };
    onSelected?: (payload: any) => void;
    onDeselected?: (payload: any) => void;
    onDragStart?: (payload: any) => void;
    onDragEnd?: (payload: any) => void;
    onDrag?: (payload: any) => void;
    style?: StyleProp<ViewStyle>;
  }>;
}

/**
 * Normalisasi markers ke array - mendukung single marker atau array
 */
function normalizeMarkers(markers: MapMarker | MapMarker[] | undefined): MapMarker[] {
  if (!markers) return [];
  return Array.isArray(markers) ? markers : [markers];
}

/**
 * Validasi marker memiliki props yang required (hanya development mode)
 */
function validateMarker(marker: MapMarker, index: number): boolean {
  if (!marker.id) {
    console.warn(`[MapsV2Custom] Marker pada index ${index} tidak memiliki prop 'id' yang required`);
    return false;
  }
  if (!marker.coordinate || !Array.isArray(marker.coordinate) || marker.coordinate.length !== 2) {
    console.warn(`[MapsV2Custom] Marker pada index ${index} tidak memiliki prop 'coordinate' yang required. Format yang diharapkan: [longitude, latitude]`);
    return false;
  }
  return true;
}

/**
 * Komponen skeleton untuk loading state dengan shimmer animation
 */
function SkeletonMarker({
  size = DEFAULT_MARKER_SIZE,
  borderColor = MainColor.darkblue,
  loadingColor = "#C5C5C5",
}: {
  size?: number;
  borderColor?: string;
  loadingColor?: string;
}) {
  const shimmerAnim = useMemo(() => new Animated.Value(0), []);

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnim, {
          toValue: 0,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );

    animation.start();

    return () => animation.stop();
  }, [shimmerAnim]);

  const shimmerOpacity = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <View
      style={[
        styles.markerContainer,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          borderColor,
          backgroundColor: loadingColor,
        },
      ]}
    >
      <Animated.View
        style={[
          styles.skeletonShimmer,
          {
            opacity: shimmerOpacity,
            backgroundColor: "#FFFFFF",
          },
        ]}
      />
    </View>
  );
}

/**
 * Komponen fallback untuk error state
 */
function FallbackMarker({
  size = DEFAULT_MARKER_SIZE,
  borderColor = MainColor.darkblue,
  iconColor = MainColor.darkblue,
}: {
  size?: number;
  borderColor?: string;
  iconColor?: string;
}) {
  return (
    <View
      style={[
        styles.markerContainer,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          borderColor,
          backgroundColor: "#F5F5F5",
          justifyContent: "center",
          alignItems: "center",
        },
      ]}
    >
      <View style={[styles.fallbackIcon, { borderColor: iconColor }]}>
        <View style={[styles.fallbackIconInner, { backgroundColor: iconColor }]} />
      </View>
    </View>
  );
}

/**
 * Props untuk DefaultMarker component
 */
export interface DefaultMarkerProps {
  /** ID file image dari API */
  imageId?: string;
  /** URL image langsung */
  imageUrl?: string;
  /** Ukuran marker (default: 30) */
  size?: number;
  /** Warna border marker (default: darkblue) */
  borderColor?: string;
  /** Warna skeleton loading (default: gray) */
  loadingColor?: string;
  /** Warna icon fallback (default: darkblue) */
  fallbackIconColor?: string;
}

/**
 * Komponen marker default dengan image, border, shadows, loading skeleton, dan error fallback
 */
export function DefaultMarker({
  imageId,
  imageUrl,
  size = DEFAULT_MARKER_SIZE,
  borderColor = MainColor.darkblue,
  loadingColor = MainColor.white_gray,
  fallbackIconColor = MainColor.darkblue,
}: DefaultMarkerProps) {
  const [hasError, setHasError] = useState(false);
  const uri = imageId ? API_IMAGE.GET({ fileId: imageId }) : imageUrl;

  // Debug log untuk development
  if (__DEV__ && uri) {
    console.log("[DefaultMarker] Image URI:", uri);
  }

  const handleError = useCallback((error: any) => {
    console.log("[DefaultMarker] Image error:", error?.nativeEvent?.error || error);
    setHasError(true);
  }, []);

  const handleLoad = useCallback(() => {
    console.log("[DefaultMarker] Image loaded successfully");
  }, []);

  // Jika tidak ada URI atau error, tampilkan fallback
  if (!uri || hasError) {
    return (
      <FallbackMarker
        size={size}
        borderColor={borderColor}
        iconColor={fallbackIconColor}
      />
    );
  }

  // Render image dengan placeholder (defaultSource) untuk loading state
  return (
    <View
      style={[
        styles.markerContainer,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          borderColor,
          backgroundColor: loadingColor, // Background color sebagai placeholder
        },
      ]}
    >
      <Image
        source={{ uri }}
        style={[styles.markerImage, { width: size, height: size }]}
        resizeMode="cover"
        onLoad={handleLoad}
        onError={handleError}
        // Placeholder untuk Android saat loading
        defaultSource={require("@/assets/images/icon.png")}
      />
    </View>
  );
}

/**
 * Komponen Map yang reusable dan customizable menggunakan Mapbox/MapLibre
 *
 * Mendukung single marker, multiple markers, atau empty state.
 *
 * @example
 * // Single marker
 * <MapsV2Custom
 *   markers={{
 *     id: "1",
 *     coordinate: [115.1756897, -8.737109],
 *     imageId: "file-123"
 *   }}
 * />
 *
 * @example
 * // Multiple markers
 * <MapsV2Custom
 *   markers={[
 *     { id: "1", coordinate: [115.175, -8.737], imageId: "abc" },
 *     { id: "2", coordinate: [115.180, -8.740], imageId: "xyz" }
 *   ]}
 * />
 *
 * @example
 * // Peta dengan custom style dan custom markers
 * <MapsV2Custom
 *   mapStyle="https://your-custom-style.com"
 *   markers={markers}
 *   markerSize={40}
 *   markerBorderColor={MainColor.primary}
 * />
 *
 * @example
 * // Dengan custom marker renderer
 * <MapsV2Custom
 *   markers={data}
 *   renderMarker={(marker) => <CustomMarker {...marker} />}
 * />
 *
 * @example
 * // Peta kosong (tanpa markers)
 * <MapsV2Custom
 *   initialRegion={{ latitude: -6.2, longitude: 106.8, latitudeDelta: 0.1, longitudeDelta: 0.1 }}
 * />
 */
export function MapsV2Custom({
  mapStyle = DEFAULT_MAP_STYLE,
  style = styles.container,
  mapViewStyle = styles.map,
  initialRegion = DEFAULT_REGION,
  zoomLevel = DEFAULT_ZOOM_LEVEL,
  markers,
  renderMarker,
  onMarkerPress,
  showDefaultMarkers = true,
  markerSize = DEFAULT_MARKER_SIZE,
  markerBorderColor = MainColor.darkblue,
  children,
  onMapPress,
  testID,
  cameraProps,
  mapViewProps,
  annotationProps,
}: MapsV2CustomProps) {
  // Normalisasi markers ke array (mendukung single atau multiple)
  const normalizedMarkers = useMemo(
    () => {
      const arr = normalizeMarkers(markers);
      // Filter marker yang invalid
      return arr.filter((marker) => {
        if (!marker.id) {
          console.warn("[MapsV2Custom] Marker tanpa id akan diabaikan");
          return false;
        }
        if (!marker.coordinate || marker.coordinate.length !== 2) {
          console.warn("[MapsV2Custom] Marker tanpa coordinate valid akan diabaikan");
          return false;
        }
        return true;
      });
    },
    [markers]
  );

  // Validasi markers dalam development mode
  useMemo(() => {
    if (__DEV__) {
      normalizedMarkers.forEach((marker, index) => {
        validateMarker(marker, index);
      });
    }
  }, [normalizedMarkers]);

  const handleMarkerSelected = useCallback(
    (marker: MapMarker) => {
      if (marker.onSelected) {
        marker.onSelected();
      }
      if (onMarkerPress) {
        onMarkerPress(marker);
      }
    },
    [onMarkerPress]
  );

  const renderMarkerComponent = useCallback(
    (marker: MapMarker): ReactNode => {
      if (renderMarker) {
        return renderMarker(marker);
      }

      if (showDefaultMarkers) {
        return (
          <DefaultMarker
            imageId={marker.imageId}
            imageUrl={marker.imageUrl}
            size={markerSize}
            borderColor={markerBorderColor}
          />
        );
      }

      return null;
    },
    [renderMarker, showDefaultMarkers, markerSize, markerBorderColor]
  );

  return (
    <View style={style} testID={testID}>
      <MapView style={mapViewStyle} mapStyle={mapStyle} {...mapViewProps}>
        <Camera
          zoomLevel={zoomLevel}
          centerCoordinate={[initialRegion.longitude, initialRegion.latitude]}
          {...cameraProps}
        />

        {normalizedMarkers.map((marker) => (
          <PointAnnotation
            key={marker.id}
            id={marker.id}
            coordinate={marker.coordinate}
            onSelected={() => handleMarkerSelected(marker)}
            {...annotationProps}
          >
            {renderMarkerComponent(marker) as any}
          </PointAnnotation>
        ))}

        {children}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  markerContainer: {
    overflow: "hidden",
    borderWidth: 1,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  markerImage: {
    width: "100%",
    height: "100%",
  },
  skeletonShimmer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 999,
  },
  fallbackIcon: {
    width: "60%",
    height: "60%",
    borderRadius: 999,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackIconInner: {
    width: "40%",
    height: "40%",
    borderRadius: 999,
  },
});
