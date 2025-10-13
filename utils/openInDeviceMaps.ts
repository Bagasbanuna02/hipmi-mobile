import { Platform, Linking, Alert } from "react-native";

export const openInDeviceMaps = async ({
  latitude,
  longitude,
  title = "Lokasi",
}: {
  latitude: number;
  longitude: number;
  title?: string;
}) => {
  let url = "";

  if (Platform.OS === "ios") {
    // Apple Maps
    url = `maps://?q=${encodeURIComponent(title)}&ll=${latitude},${longitude}`;
  } else {
    // Android: Google Maps
    url = `geo:${latitude},${longitude}?q=${latitude},${longitude}(${encodeURIComponent(
      title
    )})`;
  }

  try {
    const canOpen = await Linking.canOpenURL(url);
    if (canOpen) {
      await Linking.openURL(url);
    } else {
      // Fallback ke web
      const webUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
      await Linking.openURL(webUrl);
    }
  } catch (error) {
    console.warn("Gagal membuka Maps:", error);
    Alert.alert("Error", "Tidak dapat membuka aplikasi Maps.");
  }
};
