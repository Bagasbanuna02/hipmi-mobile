// app.config.js
require("dotenv").config();

export default {
  name: "HIPMI Badung Connect",
  slug: "hipmi-mobile",
  version: "1.0.1",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: "hipmimobile",
  userInterfaceStyle: "automatic",
  newArchEnabled: true,

  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.anonymous.hipmi-mobile",
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false,
    },
    associatedDomains: ["applinks:cld-dkr-staging-hipmi.wibudev.com"],
    buildNumber: "4",
  },

  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/images/splash-icon.png",
      backgroundColor: "#ffffff",
    },
    edgeToEdgeEnabled: true,
    package: "com.bip.hipmimobileapp",
    versionCode: 4,
    // softwareKeyboardLayoutMode: 'resize', // option: untuk mengatur keyboard pada room chst collaboration
    intentFilters: [
      {
        action: "VIEW",
        autoVerify: true, // wajib untuk App Links
        data: [
          {
            scheme: "https",
            host: "cld-dkr-staging-hipmi.wibudev.com",
            pathPrefix: "/",
          },
        ],
        category: ["BROWSABLE", "DEFAULT"],
      },
    ],
  },

  web: {
    bundler: "metro",
    output: "static",
    favicon: "./assets/images/favicon.png",
  },

  plugins: [
    "expo-router",
    "expo-web-browser",
    [
      "expo-splash-screen",
      {
        image: "./assets/images/splash-icon.png",
        imageWidth: 200,
        resizeMode: "contain",
        backgroundColor: "#ffffff",
      },
    ],
    [
      "expo-camera",
      {
        cameraPermission: "Allow $(PRODUCT_NAME) to access your camera",
        microphonePermission: "Allow $(PRODUCT_NAME) to access your microphone",
        recordAudioAndroid: true,
      },
    ],
    "expo-font",
  ],

  experiments: {
    typedRoutes: true,
  },

  extra: {
    router: {},
    eas: {
      projectId: "5cf15964-4889-4755-b8ed-b99c61d614d1",
    },
    // Tambahkan environment variables ke sini
    API_BASE_URL: process.env.API_BASE_URL,
    BASE_URL: process.env.BASE_URL,
    DEEP_LINK_URL: process.env.DEEP_LINK_URL,
  },
};
