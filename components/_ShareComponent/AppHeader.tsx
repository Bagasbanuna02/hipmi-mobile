import { MainColor } from "@/constants/color-palet";
import { Platform, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BackButton } from "..";

type Props = {
  title: string;
  right?: React.ReactNode;
  showBack?: boolean;
  onPressLeft?: () => void;
  left?: React.ReactNode;
};

export default function AppHeader({
  title,
  right,
  showBack = true,
  onPressLeft,
  left,
}: Props) {
  const insets = useSafeAreaInsets();

  // iOS 16+ detection (Dynamic Island) - insets.top > 47 indicates Dynamic Island
  const isIOS26Plus =
    Platform.OS === "ios" && insets.top > 47;

  // Dynamic padding berdasarkan platform dan iOS version
  const paddingTop =
    Platform.OS === "ios"
      ? isIOS26Plus
        ? insets.top - 10
        : insets.top
      : 40;

  const paddingBottom = Platform.OS === "ios" ? 8 : 13;

  return (
    <View
      style={[
        {
          backgroundColor: MainColor.darkblue,
          paddingTop,
          paddingBottom,
        },
      ]}
      pointerEvents="box-none"
    >
      {/* Header Container dengan absolute positioning untuk title center */}
      <View style={styles.headerApp} pointerEvents="box-none">
        {/* Left Section - Absolute Left */}
        <View style={styles.headerLeft}>
          {showBack ? (
            <BackButton onPress={onPressLeft} />
          ) : left ? (
            left
          ) : (
            <View style={styles.placeholder} />
          )}
        </View>

        {/* Title - Absolute Center */}
        <View style={styles.headerCenter}>
          <Text
            style={styles.headerTitle}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {title ? title.charAt(0).toUpperCase() + title.slice(1) : ""}
          </Text>
        </View>

        {/* Right Section - Absolute Right */}
        <View style={styles.headerRight}>
          {right}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerApp: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    height: 44, // Fixed height untuk consistency
  },
  headerLeft: {
    position: "absolute",
    left: 16,
    zIndex: 1,
  },
  headerCenter: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headerRight: {
    position: "absolute",
    right: 16,
    zIndex: 1,
  },
  placeholder: {
    width: 40,
    height: 40,
  },
  headerTitle: {
    color: MainColor.yellow,
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
});
