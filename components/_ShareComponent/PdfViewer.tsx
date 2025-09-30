// PdfViewer.tsx
import React, { useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import WebView from "react-native-webview";

interface PdfViewerProps {
  uri: string; // URL PDF dari API
}

const PdfViewer: React.FC<PdfViewerProps> = ({ uri }) => {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      )}
      <WebView
        source={{ uri }}
        style={styles.webView}
        onLoadEnd={() => setLoading(false)}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.warn("WebView error:", nativeEvent);
          setLoading(false);
        }}
        scalesPageToFit={true}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        originWhitelist={["*"]}
      />
    </>
  );
};

// const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  loadingContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.8)",
    zIndex: 1,
  },
  webView: {
    // width: width,
    // height: height,
    flex: 1,
  },
});

export default PdfViewer;
