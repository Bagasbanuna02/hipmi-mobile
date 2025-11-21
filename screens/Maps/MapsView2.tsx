import { TextCustom, ViewWrapper } from "@/components";
import Mapbox from "@rnmapbox/maps";
import { View } from "react-native";

// Nonaktifkan telemetry (opsional, untuk privasi)
Mapbox.setTelemetryEnabled(false);

// Gunakan style OSM gratis
const MAP_STYLE_URL = "https://tiles.stadiamaps.com/styles/osm_bright.json";

// Atau gunakan MapLibre default:
// const MAP_STYLE_URL = 'https://demotiles.maplibre.org/style.json';
export default function MapsView2() {
  return (
    <>
      <ViewWrapper>
      <View style={{ flex: 1 }}>
          <Mapbox.MapView style={{ flex: 1 }}>
          <Mapbox.Camera
            centerCoordinate={[115.2126, -8.65]} // Bali
            zoomLevel={12}
          />
        </Mapbox.MapView>
      </View>
      </ViewWrapper>
    </>
  );
}
