// VersionBadge.tsx
import Constants from "expo-constants";
import { Platform } from "react-native";

export default function versionBadge() {
  const expoConfig = Constants.expoConfig;

  const version = expoConfig?.version; // "1.0.1"
  const iosBuild = expoConfig?.ios?.buildNumber; // "10"
  const androidBuild = expoConfig?.android?.versionCode; // 2

  const build =
    Platform.OS === "ios" ? iosBuild : androidBuild;

    const result = `${version} ( ${build} )`;

  return result
}
