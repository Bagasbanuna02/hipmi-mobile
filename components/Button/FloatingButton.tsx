// components/FloatingButton.tsx
import { AccentColor, MainColor } from "@/constants/color-palet";
import React from "react";
import { StyleSheet, ViewStyle } from "react-native";
import { FAB } from "react-native-paper";

// Props untuk komponen
interface FloatingButtonProps {
  onPress: () => void;
//   label?: string;
  icon?: string; // MaterialCommunityIcons
  style?: ViewStyle;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({
  onPress,
  //   label = "Buat",
  icon = "pencil-plus-outline",
  style,
}) => {
  return (
    <FAB
      style={[styles.fab, style]}
      icon={icon}
      color={MainColor.white}
      //   label={label}
      onPress={onPress}
    />
  );
};

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: "auto",
    right: 0,
    // bottom: 10,
    top: -20,
    backgroundColor: AccentColor.softblue, // Warna Twitter biru
    borderRadius: 50,
    borderColor: AccentColor.blue,
    borderWidth: 1,
  },
});

export default FloatingButton;
