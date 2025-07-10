// Center.tsx
import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";

type JustifyContent =
  | "flex-start"
  | "flex-end"
  | "center"
  | "space-between"
  | "space-around"
  | "space-evenly";

type AlignItems = "flex-start" | "flex-end" | "center" | "stretch" | "baseline";

interface CenterProps {
  children: React.ReactNode;
  style?: ViewStyle;
  direction?: "row" | "column";
  justifyContent?: JustifyContent;
  alignItems?: AlignItems;
}

const CenterCustom: React.FC<CenterProps> = ({
  children,
  style,
  direction = "column",
  justifyContent = "center",
  alignItems = "center",
}) => {
  return (
    <View
      style={[
        styles.container,
        { flexDirection: direction },
        { justifyContent },
        { alignItems },
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CenterCustom;
