import * as WebBrowser from "expo-web-browser";

export const openBrowser = async (url: string) => {
  try {
    await WebBrowser.openBrowserAsync(url);
  } catch (error) {
    console.error("Gagal membuka browser:", error);
  }
};