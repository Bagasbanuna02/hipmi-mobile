import React from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

// Define types for props
type Orientation = "horizontal" | "vertical";
type HorizontalLabelPosition = "center" | "left" | "right";
type VerticalLabelPosition = "center" | "top" | "bottom";
type LabelPosition = HorizontalLabelPosition | VerticalLabelPosition;

type Size = number | "xs" | "sm" | "md" | "lg" | "xl";

interface DividerProps {
  orientation?: Orientation;
  color?: string;
  size?: Size;
  label?: React.ReactNode;
  labelPosition?: LabelPosition;
  labelStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
}

const DividerCustom: React.FC<DividerProps> = ({
  orientation = "horizontal",
  color = "#DADADA",
  size = "xs",
  label,
  labelPosition = "center",
  labelStyle,
  style,
}) => {
  const isHorizontal = orientation === "horizontal";

  // Convert size to actual dimensions
  const getSize = (): number => {
    if (typeof size === "number") return size;

    switch (size) {
      case "xs":
        return 1;
      case "sm":
        return 2;
      case "md":
        return 3;
      case "lg":
        return 4;
      case "xl":
        return 5;
      default:
        return 1; // Default size
    }
  };

  const thickness = getSize();

  const capitalize = (str: string): string =>
    str.charAt(0).toUpperCase() + str.slice(1);

  const renderLabel = () => {
    if (!label) return null;

    return (
      <View
        style={[
          styles.labelContainer,
          isHorizontal
            ? styles[
                `label${capitalize(
                  labelPosition as string
                )}` as keyof typeof styles
              ]
            : styles[
                `label${capitalize(
                  labelPosition as string
                )}` as keyof typeof styles
              ],
        ]}
      >
        <Text style={[styles.labelText, labelStyle]}>{label}</Text>
      </View>
    );
  };

  return (
    <View
      style={[
        isHorizontal ? styles.horizontalDivider : styles.verticalDivider,
        { backgroundColor: color },
        style,
      ]}
    >
      {isHorizontal ? (
        labelPosition !== "center" ? (
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            {labelPosition === "left" && renderLabel()}
            <View
              style={{ flex: 1, backgroundColor: color, height: thickness }}
            />
            {labelPosition === "right" && renderLabel()}
          </View>
        ) : (
          <>
            {renderLabel()}
            <View style={{ flex: 1 }} />
          </>
        )
      ) : labelPosition !== "center" && !isHorizontal ? (
        <View
          style={{ flex: 1, flexDirection: "column", justifyContent: "center" }}
        >
          {labelPosition === "top" && renderLabel()}
          <View style={{ flex: 1, backgroundColor: color, width: thickness }} />
          {labelPosition === "bottom" && renderLabel()}
        </View>
      ) : (
        <>
          {renderLabel()}
          <View style={{ flex: 1 }} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  horizontalDivider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
    position: "relative",
  },
  verticalDivider: {
    flexDirection: "column",
    justifyContent: "center",
    marginHorizontal: 8,
    position: "relative",
  },
  labelText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666",
    marginHorizontal: 12,
    marginVertical: 4,
    backgroundColor: "white",
    paddingHorizontal: 8,
  },
  labelContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  labelLeft: {
    left: 12,
    right: null,
    alignItems: "flex-start",
  },
  labelRight: {
    right: 12,
    left: null,
    alignItems: "flex-end",
  },
  labelCenter: {
    justifyContent: "center",
    alignItems: "center",
  },
  labelTop: {
    top: 12,
    bottom: null,
    justifyContent: "flex-start",
  },
  labelBottom: {
    bottom: 12,
    top: null,
    justifyContent: "flex-end",
  },
});

export default DividerCustom;
